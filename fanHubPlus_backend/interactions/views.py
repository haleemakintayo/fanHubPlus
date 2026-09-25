# interactions/views.py

from rest_framework import generics, viewsets, permissions, status, serializers as drf_serializers
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Avg
from drf_spectacular.utils import extend_schema, OpenApiResponse, inline_serializer

from .models import Bookmark, ContentRating, FanSubmission, Feedback, UserActivity
from .serializers import (
    BookmarkSerializer,
    ContentRatingSerializer,
    FanSubmissionSerializer,
    AdminModerationActionSerializer,
    FeedbackSerializer,
    AdminFeedbackSerializer,
    UserActivitySerializer,
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


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows public read-only access (GET, HEAD, OPTIONS),
    and restricts write operations (POST, PUT, PATCH, DELETE) to Administrators.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and
            request.user.is_authenticated and
            (getattr(request.user, 'role', '') == 'ADMIN' or request.user.is_staff or request.user.is_superuser)
        )


def normalize_bookmark_item_type(raw_type):
    if not raw_type:
        return Bookmark.ItemType.ARTICLE
    upper = str(raw_type).upper()
    if 'CHAR' in upper:
        return Bookmark.ItemType.CHARACTER
    if 'VID' in upper or 'TRAILER' in upper:
        return Bookmark.ItemType.VIDEO
    if 'AUD' in upper or 'TRACK' in upper or 'SOUND' in upper:
        return Bookmark.ItemType.AUDIO
    if 'MERCH' in upper or 'DROP' in upper or 'COLLECT' in upper:
        return Bookmark.ItemType.MERCHANDISE
    return Bookmark.ItemType.ARTICLE


class BookmarkToggleAPIView(APIView):
    """
    GET /api/interactions/bookmarks/toggle/ - List user bookmarks
    POST /api/interactions/bookmarks/toggle/ - Atomically creates or destroys a bookmark for the authenticated user.
    Supports both database Content items (`content_id`) and platform items (`external_id`, `item_title`, `item_type`).
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        bookmarks = Bookmark.objects.filter(user=request.user).select_related('content', 'content__category').order_by('-created_at')
        serializer = BookmarkSerializer(bookmarks, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        tags=['Interactions'],
        summary='Toggle content or item bookmark',
        request=inline_serializer(
            name='BookmarkToggleRequest',
            fields={
                'content_id': drf_serializers.IntegerField(required=False),
                'external_id': drf_serializers.CharField(required=False),
                'item_title': drf_serializers.CharField(required=False),
                'item_type': drf_serializers.CharField(required=False),
                'category_name': drf_serializers.CharField(required=False),
                'thumbnail_url': drf_serializers.CharField(required=False),
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
        external_id = str(request.data.get('external_id') or '').strip()
        item_title = str(request.data.get('item_title') or request.data.get('title') or '').strip()
        raw_type = request.data.get('item_type') or request.data.get('type') or 'ARTICLE'
        item_type = normalize_bookmark_item_type(raw_type)
        category_name = str(request.data.get('category_name') or '').strip()
        thumbnail_url = request.data.get('thumbnail_url') or None
        note = request.data.get('note', '')

        content = None
        if content_id is not None and str(content_id).isdigit():
            content = get_object_or_404(Content, pk=int(content_id))
        elif content_id is not None and not external_id:
            external_id = str(content_id)
            content = Content.objects.filter(slug=external_id).first()
        elif external_id:
            content = Content.objects.filter(slug=external_id).first()

        if not content and not external_id:
            return Response({'error': 'content_id or external_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        if content:
            bookmark = Bookmark.objects.filter(user=request.user, content=content).first()
        else:
            bookmark = Bookmark.objects.filter(user=request.user, external_id=external_id).first()

        if bookmark:
            removed_title = bookmark.item_title or (bookmark.content.title if bookmark.content else external_id)
            bookmark.delete()
            return Response({
                'bookmarked': False,
                'message': 'Bookmark removed.',
                'content_id': content.id if content else None,
                'external_id': external_id or (content.slug if content else ''),
                'title': removed_title,
            }, status=status.HTTP_200_OK)
        else:
            resolved_title = item_title or (content.title if content else external_id)
            resolved_category = category_name or (content.category.name if content and content.category else 'Multiverse')
            resolved_thumb = thumbnail_url or (content.thumbnail_url or content.media_url if content else None)
            if content and not raw_type:
                item_type = normalize_bookmark_item_type(content.content_type)

            new_bookmark = Bookmark.objects.create(
                user=request.user,
                content=content,
                external_id=external_id or (content.slug if content else ''),
                item_title=resolved_title,
                item_type=item_type,
                category_name=resolved_category,
                thumbnail_url=resolved_thumb,
                note=note
            )

            UserActivity.objects.create(
                user=request.user,
                action_type=UserActivity.ActionType.BOOKMARK,
                target_type=item_type,
                target_id=external_id or (str(content.id) if content else ''),
                target_title=resolved_title,
                category_name=resolved_category,
                detail=f"Saved to Vault{f' with note: {note}' if note else ''}"
            )

            return Response({
                'bookmarked': True,
                'bookmark_id': new_bookmark.id,
                'message': 'Content bookmarked.',
                'content_id': content.id if content else None,
                'external_id': new_bookmark.external_id,
                'note': new_bookmark.note,
            }, status=status.HTTP_201_CREATED)


BookmarkToggleView = BookmarkToggleAPIView


class BookmarkNoteAPIView(APIView):
    """
    PATCH /api/interactions/bookmarks/note/
    PATCH /api/interactions/bookmarks/<int:pk>/
    DELETE /api/interactions/bookmarks/<int:pk>/
    Updates or saves a personal note on a bookmarked entry, or removes a bookmark.
    """
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk=None, *args, **kwargs):
        note = str(request.data.get('note', '')).strip()[:500]
        bookmark_id = pk or request.data.get('bookmark_id') or request.data.get('id')
        content_id = request.data.get('content_id')
        external_id = str(request.data.get('external_id') or '').strip()

        bookmark = None
        if bookmark_id and str(bookmark_id).isdigit():
            bookmark = Bookmark.objects.filter(user=request.user, pk=int(bookmark_id)).first()
        if not bookmark and content_id and str(content_id).isdigit():
            bookmark = Bookmark.objects.filter(user=request.user, content_id=int(content_id)).first()
        if not bookmark and external_id:
            bookmark = Bookmark.objects.filter(user=request.user, external_id=external_id).first()
            if not bookmark:
                content = Content.objects.filter(slug=external_id).first()
                if content:
                    bookmark = Bookmark.objects.filter(user=request.user, content=content).first()

        if not bookmark:
            # Upsert bookmark if it was previously saved locally on the client
            if not external_id and not content_id:
                return Response({'error': 'Bookmark identifier is required.'}, status=status.HTTP_400_BAD_REQUEST)
            content = Content.objects.filter(pk=int(content_id)).first() if (content_id and str(content_id).isdigit()) else Content.objects.filter(slug=external_id).first()
            item_title = str(request.data.get('item_title') or request.data.get('title') or (content.title if content else external_id))
            item_type = normalize_bookmark_item_type(request.data.get('item_type') or request.data.get('type'))
            category_name = str(request.data.get('category_name') or (content.category.name if content and content.category else 'Multiverse'))
            bookmark = Bookmark.objects.create(
                user=request.user,
                content=content,
                external_id=external_id or (content.slug if content else str(content_id)),
                item_title=item_title,
                item_type=item_type,
                category_name=category_name,
                note=note
            )
        else:
            bookmark.note = note
            bookmark.save(update_fields=['note', 'updated_at'])

        target_title = bookmark.item_title or (bookmark.content.title if bookmark.content else bookmark.external_id)
        UserActivity.objects.create(
            user=request.user,
            action_type=UserActivity.ActionType.NOTE,
            target_type=bookmark.item_type,
            target_id=bookmark.external_id or str(bookmark.id),
            target_title=target_title,
            category_name=bookmark.category_name,
            detail=f"Personal note updated: \"{note[:80]}\"" if note else "Cleared personal note"
        )

        return Response({
            'id': bookmark.id,
            'external_id': bookmark.external_id,
            'content_id': bookmark.content_id,
            'title': target_title,
            'note': bookmark.note,
            'updated_at': bookmark.updated_at,
            'message': 'Bookmark note saved.'
        }, status=status.HTTP_200_OK)

    def delete(self, request, pk=None, *args, **kwargs):
        bookmark = get_object_or_404(Bookmark, user=request.user, pk=pk)
        bookmark.delete()
        return Response({'message': 'Bookmark removed.'}, status=status.HTTP_200_OK)


class UserActivityListCreateAPIView(APIView):
    """
    GET /api/interactions/activity/ - List recent user activity stream
    POST /api/interactions/activity/ - Log a new user interaction or browsing event
    DELETE /api/interactions/activity/ - Clear user activity log
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        qs = UserActivity.objects.filter(user=request.user).order_by('-created_at')[:30]
        serializer = UserActivitySerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data.copy() if hasattr(request.data, 'copy') else dict(request.data)
        raw_action = str(data.get('action_type') or 'VIEW').upper()
        valid_actions = {choice[0] for choice in UserActivity.ActionType.choices}
        if raw_action not in valid_actions:
            if 'BOOKMARK' in raw_action:
                data['action_type'] = UserActivity.ActionType.BOOKMARK
            elif 'NOTE' in raw_action:
                data['action_type'] = UserActivity.ActionType.NOTE
            elif 'RATE' in raw_action or 'RATING' in raw_action:
                data['action_type'] = UserActivity.ActionType.RATING
            elif 'SUB' in raw_action or 'FEEDBACK' in raw_action:
                data['action_type'] = UserActivity.ActionType.SUBMISSION
            elif 'CHAT' in raw_action or 'BOT' in raw_action:
                data['action_type'] = UserActivity.ActionType.CHATBOT
            elif 'FILTER' in raw_action:
                data['action_type'] = UserActivity.ActionType.FILTER
            elif 'PROF' in raw_action:
                data['action_type'] = UserActivity.ActionType.PROFILE
            else:
                data['action_type'] = UserActivity.ActionType.VIEW

        serializer = UserActivitySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        activity = serializer.save(user=request.user)
        return Response(UserActivitySerializer(activity).data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        UserActivity.objects.filter(user=request.user).delete()
        return Response({'message': 'Activity history cleared.'}, status=status.HTTP_200_OK)


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
                'content_id': drf_serializers.CharField(required=False),
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

        if str(content_id).isdigit():
            content = get_object_or_404(Content, pk=int(content_id))
        else:
            content = get_object_or_404(Content, slug=str(content_id))

        rating_obj, created = ContentRating.objects.update_or_create(
            user=request.user,
            content=content,
            defaults={'score': score}
        )

        UserActivity.objects.create(
            user=request.user,
            action_type=UserActivity.ActionType.RATING,
            target_type=content.content_type,
            target_id=content.slug,
            target_title=content.title,
            category_name=content.category.name if content.category else '',
            detail=f"Rated {score}/5 stars"
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
        submission = serializer.save(user=self.request.user, status=FanSubmission.Status.PENDING)
        UserActivity.objects.create(
            user=self.request.user,
            action_type=UserActivity.ActionType.SUBMISSION,
            target_type='ARTICLE',
            target_id=str(submission.id),
            target_title=submission.title,
            category_name=submission.category.name if submission.category else '',
            detail='Submitted fan article for moderation review'
        )


FanSubmissionCreateAPIView = FanSubmissionView


@extend_schema(tags=['Interactions Moderation'])
class AdminModerationViewSet(viewsets.ModelViewSet):
    """
    Admin Moderation Queue for Fan Submissions:
    GET /api/interactions/moderation/ - List submissions (supports ?status=ALL|PENDING|APPROVED|REJECTED)
    PATCH /api/interactions/moderation/<id>/ - Approve or reject draft
    PATCH/POST /api/interactions/moderation/<id>/moderate/ - Approve or reject draft
    """
    permission_classes = [IsAdminRole]
    serializer_class = FanSubmissionSerializer
    queryset = FanSubmission.objects.all().select_related('user', 'category').order_by('-created_at')
    pagination_class = None

    def get_queryset(self):
        qs = super().get_queryset()
        status_param = self.request.query_params.get('status', 'ALL')
        if status_param and status_param.upper() != 'ALL':
            qs = qs.filter(status=status_param.upper())
        return qs

    def _execute_moderation(self, request, submission):
        action_serializer = AdminModerationActionSerializer(data=request.data)
        action_serializer.is_valid(raise_exception=True)

        decision = action_serializer.validated_data['status']
        feedback = action_serializer.validated_data.get('admin_feedback', '')

        if decision == 'PENDING':
            submission.status = FanSubmission.Status.PENDING
            submission.admin_feedback = feedback
            submission.save()
            return Response(FanSubmissionSerializer(submission).data, status=status.HTTP_200_OK)

        sub, published = ModerationPipeline.moderate_submission(submission, decision, feedback)

        response_data = FanSubmissionSerializer(sub).data
        if published:
            response_data['published_content_id'] = published.id
            response_data['published_content_slug'] = published.slug

        return Response(response_data, status=status.HTTP_200_OK)

    @extend_schema(
        summary='Moderate submission (Approve or Reject)',
        request=AdminModerationActionSerializer,
        responses={200: FanSubmissionSerializer}
    )
    def partial_update(self, request, *args, **kwargs):
        submission = self.get_object()
        return self._execute_moderation(request, submission)

    @action(detail=True, methods=['patch', 'post'], url_path='moderate')
    def moderate(self, request, *args, **kwargs):
        submission = self.get_object()
        return self._execute_moderation(request, submission)


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


@extend_schema(tags=['Interactions Moderation'])
class AdminFeedbackViewSet(viewsets.ModelViewSet):
    """
    GET /api/interactions/admin/feedback/ - List all user feedback tickets (filterable by feedback_type and status)
    PATCH /api/interactions/admin/feedback/<id>/ - Update resolution status (NEW, IN_REVIEW, RESOLVED)
    DELETE /api/interactions/admin/feedback/<id>/ - Remove feedback ticket
    """
    permission_classes = [IsAdminRole]
    serializer_class = AdminFeedbackSerializer
    queryset = Feedback.objects.all().select_related('user').order_by('-created_at')
    pagination_class = None

    def get_queryset(self):
        qs = super().get_queryset()
        feedback_type = self.request.query_params.get('type') or self.request.query_params.get('feedback_type')
        status_param = self.request.query_params.get('status')
        if feedback_type and feedback_type.upper() != 'ALL':
            qs = qs.filter(feedback_type=feedback_type.upper())
        if status_param and status_param.upper() != 'ALL':
            qs = qs.filter(status=status_param.upper())
        return qs
