# interactions/views.py

from rest_framework import generics, viewsets, permissions, status, serializers as drf_serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Avg
from drf_spectacular.utils import extend_schema, OpenApiResponse, inline_serializer

from .models import Bookmark, ContentRating, FanSubmission, Feedback
from .serializers import (
    BookmarkSerializer,
    ContentRatingSerializer,
    FanSubmissionSerializer,
    AdminModerationActionSerializer,
    FeedbackSerializer,
)
from .services import ModerationPipeline, FeedbackDispatcher
from fandoms.models import Content


class IsAdminRole(permissions.BasePermission):
    """
    Allows access only to users with role=ADMIN or is_staff/is_superuser.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (getattr(request.user, 'role', '') == 'ADMIN' or request.user.is_staff or request.user.is_superuser)
        )


class BookmarkToggleAPIView(APIView):
    """
    POST /api/interactions/bookmarks/toggle/
    Atomically creates or destroys a bookmark for the authenticated user.
    Body: {"content_id": 1, "note": "optional note"}
    """
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        tags=['Interactions'],
        summary='Toggle content bookmark',
        request=inline_serializer(
            name='BookmarkToggleRequest',
            fields={
                'content_id': drf_serializers.IntegerField(required=True),
                'note': drf_serializers.CharField(required=False, allow_blank=True, default='')
            }
        ),
        responses={
            200: OpenApiResponse(description='Bookmark removed successfully.'),
            201: OpenApiResponse(description='Bookmark created successfully.'),
            400: OpenApiResponse(description='Validation error.')
        }
    )
    def post(self, request, *args, **kwargs):
        content_id = request.data.get('content_id') or kwargs.get('content_id') or kwargs.get('pk')
        if not content_id:
            return Response({'error': 'content_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        content = get_object_or_404(Content, pk=content_id)
        note = request.data.get('note', '')

        bookmark = Bookmark.objects.filter(user=request.user, content=content).first()
        if bookmark:
            bookmark.delete()
            return Response({
                'bookmarked': False,
                'message': 'Bookmark removed.',
                'content_id': content.id,
            }, status=status.HTTP_200_OK)
        else:
            Bookmark.objects.create(user=request.user, content=content, note=note)
            return Response({
                'bookmarked': True,
                'message': 'Content bookmarked.',
                'content_id': content.id,
            }, status=status.HTTP_201_CREATED)


BookmarkToggleView = BookmarkToggleAPIView


class RatingSubmitView(APIView):
    """
    POST /api/interactions/ratings/
    POST /content/<int:content_id>/rate/
    Upserts a user rating (1-5 stars) and triggers dynamic recalculation
    of content's popularity score.
    Body: {"content_id": 1, "score": 5} or {"score": 5}
    """
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        tags=['Interactions'],
        summary='Submit content rating (1-5 stars)',
        request=inline_serializer(
            name='RatingSubmitRequest',
            fields={
                'content_id': drf_serializers.IntegerField(required=False),
                'score': drf_serializers.IntegerField(required=True, min_value=1, max_value=5)
            }
        ),
        responses={
            200: OpenApiResponse(description='Rating upserted and popularity score recalculated.'),
            400: OpenApiResponse(description='Invalid rating score.')
        }
    )
    def post(self, request, *args, **kwargs):
        content_id = request.data.get('content_id') or kwargs.get('content_id') or kwargs.get('pk')
        score = request.data.get('score')

        if not content_id or score is None:
            return Response({'error': 'content_id and score are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            score = int(score)
            if score < 1 or score > 5:
                return Response({'error': 'Score must be between 1 and 5.'}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Score must be an integer.'}, status=status.HTTP_400_BAD_REQUEST)

        content = get_object_or_404(Content, pk=content_id)

        rating_obj, created = ContentRating.objects.update_or_create(
            user=request.user,
            content=content,
            defaults={'score': score}
        )

        content.refresh_from_db()
        avg_rating = ContentRating.objects.filter(content=content).aggregate(Avg('score'))['score__avg'] or 0.0

        return Response({
            'status': 'success',
            'created': created,
            'user_score': score,
            'average_rating': round(avg_rating, 2),
            'popularity_score': content.popularity_score,
            'ratings_count': ContentRating.objects.filter(content=content).count()
        }, status=status.HTTP_200_OK)


@extend_schema(tags=['Interactions'])
class FanSubmissionView(generics.ListCreateAPIView):
    """
    GET /api/interactions/submissions/ - List authenticated user's fan submissions
    POST /api/interactions/submissions/ - Submit draft for moderation
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FanSubmissionSerializer

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return FanSubmission.objects.none()
        return FanSubmission.objects.filter(user=self.request.user).select_related('category')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status=FanSubmission.Status.PENDING)


FanSubmissionCreateAPIView = FanSubmissionView


@extend_schema(tags=['Interactions Moderation'])
class AdminModerationViewSet(viewsets.ModelViewSet):
    """
    Admin Moderation Queue for Fan Submissions:
    GET /api/interactions/moderation/ - List submissions (defaults to PENDING)
    PATCH /api/interactions/moderation/<id>/moderate/ - Approve or reject draft
    """
    permission_classes = [IsAdminRole]
    serializer_class = FanSubmissionSerializer
    queryset = FanSubmission.objects.all().select_related('user', 'category').order_by('-created_at')

    def get_queryset(self):
        qs = super().get_queryset()
        status_param = self.request.query_params.get('status', 'PENDING')
        if status_param and status_param != 'ALL':
            qs = qs.filter(status=status_param.upper())
        return qs

    @extend_schema(
        summary='Moderate submission (Approve or Reject)',
        request=AdminModerationActionSerializer,
        responses={200: FanSubmissionSerializer}
    )
    def partial_update(self, request, *args, **kwargs):
        submission = self.get_object()
        action_serializer = AdminModerationActionSerializer(data=request.data)
        action_serializer.is_valid(raise_exception=True)

        decision = action_serializer.validated_data['status']
        feedback = action_serializer.validated_data.get('admin_feedback', '')

        sub, published = ModerationPipeline.moderate_submission(submission, decision, feedback)

        response_data = FanSubmissionSerializer(sub).data
        if published:
            response_data['published_content_id'] = published.id
            response_data['published_content_slug'] = published.slug

        return Response(response_data, status=status.HTTP_200_OK)


AdminModerationView = AdminModerationViewSet


@extend_schema(tags=['Interactions'])
class FeedbackView(generics.CreateAPIView):
    """
    POST /api/interactions/feedback/
    Submit platform feedback, bug report, or feature suggestion.
    Accessible to both visitors and registered members.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = FeedbackSerializer

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        feedback = serializer.save(user=user)
        FeedbackDispatcher.dispatch_feedback(feedback)
