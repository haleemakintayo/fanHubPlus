# merchandise/views.py

from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse

from .models import MerchandiseItem
from .serializers import MerchandiseItemSerializer
from .services import ViewCounterService, DropRadarScheduler
from interactions.views import IsAdminOrReadOnly
from fandoms.views import DualLookupMixin


@extend_schema(
    tags=['Merchandise'],
    summary='List or create merchandise items filterable by universe category, tag, or drop state'
)
class MerchandiseGalleryAPIView(generics.ListCreateAPIView):
    """
    GET /api/merchandise/
    POST /api/merchandise/ (Admin only)
    Returns merchandise items filterable by category, tag badge, or upcoming state.
    """
    serializer_class = MerchandiseItemSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        qs = MerchandiseItem.objects.all().select_related('category')
        category = self.request.query_params.get('category')
        tag = self.request.query_params.get('tag')
        is_upcoming = self.request.query_params.get('upcoming')

        if category:
            if str(category).isdigit():
                qs = qs.filter(category_id=int(category))
            else:
                qs = qs.filter(category__slug=category)

        if tag:
            qs = qs.filter(tag__iexact=tag)

        if is_upcoming is not None:
            if is_upcoming.lower() in ['true', '1']:
                qs = qs.filter(is_upcoming=True)
            elif is_upcoming.lower() in ['false', '0']:
                qs = qs.filter(is_upcoming=False)

        return qs.order_by('-view_count', '-created_at')


MerchGalleryView = MerchandiseGalleryAPIView


@extend_schema(
    tags=['Merchandise'],
    summary='Retrieve, update, or delete item details and increment view count'
)
class MerchandiseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/merchandise/<slug>/
    PATCH/DELETE /api/merchandise/<slug>/ (Admin only)
    Retrieves item details and atomically tracks view count.
    """
    queryset = MerchandiseItem.objects.all().select_related('category')
    serializer_class = MerchandiseItemSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

    def get_object(self):
        lookup = self.kwargs.get('slug')
        if str(lookup).isdigit():
            return get_object_or_404(self.get_queryset(), pk=int(lookup))
        return get_object_or_404(self.get_queryset(), slug=lookup)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        new_count = ViewCounterService.increment_view_count(instance.pk)
        if new_count is not None:
            instance.view_count = new_count
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


MerchDetailView = MerchandiseDetailAPIView


@extend_schema(tags=['Merchandise Admin'], summary='Manage merchandise items and drop radar')
class AdminMerchandiseViewSet(DualLookupMixin, viewsets.ModelViewSet):
    queryset = MerchandiseItem.objects.all().select_related('category').order_by('-view_count', '-created_at')
    serializer_class = MerchandiseItemSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    pagination_class = None


@extend_schema(
    tags=['Merchandise'],
    summary='Retrieve prioritized upcoming showcase drops'
)
class UpcomingDropsView(generics.ListAPIView):
    """
    GET /api/merchandise/upcoming/
    Returns prioritized upcoming showcase drops.
    """
    serializer_class = MerchandiseItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        category = self.request.query_params.get('category')
        tag = self.request.query_params.get('tag')
        return DropRadarScheduler.get_upcoming_drops(category_slug=category, tag=tag)


class MerchandiseTrackClickAPIView(APIView):
    """
    POST /api/merchandise/<slug_or_id>/track-click/
    Increments visual popularity upon card inspection.
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Merchandise'],
        summary='Increment view popularity counter upon card inspection',
        request=None,
        responses={
            200: OpenApiResponse(description='View counter incremented successfully.'),
            404: OpenApiResponse(description='Merchandise item not found.')
        }
    )
    def post(self, request, identifier, *args, **kwargs):
        if str(identifier).isdigit():
            new_count = ViewCounterService.increment_view_count(int(identifier))
        else:
            new_count = ViewCounterService.increment_by_slug(str(identifier))

        if new_count is not None:
            return Response({'status': 'success', 'view_count': new_count}, status=status.HTTP_200_OK)
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
