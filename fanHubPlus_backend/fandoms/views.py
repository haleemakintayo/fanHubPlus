# fandoms/views.py

from rest_framework import generics, viewsets, permissions, filters
from rest_framework.response import Response
from django.db.models import F
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema

from .models import Category, Content, CharacterProfile
from .serializers import (
    CategorySerializer,
    ContentListSerializer,
    ContentDetailSerializer,
    CharacterProfileSerializer,
)
from .services import ContentFilter, ContentFilterService, SearchVectorEngine


@extend_schema(tags=['Fandoms'], summary='List all 8 fandom categories')
class CategoryListView(generics.ListAPIView):
    """
    GET /api/fandoms/categories/
    Returns all 8 fandom categories with icons, quotes, and metadata.
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


@extend_schema(tags=['Fandoms'])
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    pagination_class = None


@extend_schema(
    tags=['Fandoms'],
    summary='Explore content with genre filtering, multi-tier search, and sorting'
)
class ContentExplorerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/fandoms/content/
    Read-only endpoint supporting multi-tier search, genre filtering, and sorting:
    ?category=anime&type=video&sort=popular&search=titan
    """
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ContentFilter
    ordering_fields = ['popularity_score', 'created_at', 'title', 'view_count']
    ordering = ['-popularity_score']
    lookup_field = 'slug'

    def get_queryset(self):
        qs = Content.objects.filter(is_published=True).select_related('category').prefetch_related('ratings', 'bookmarks')
        return ContentFilterService.apply_filters(qs, self.request.query_params)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ContentDetailSerializer
        return ContentListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Content.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


ContentExplorerView = ContentExplorerViewSet


@extend_schema(tags=['Fandoms'], summary='Retrieve content detail and increment view count')
class ContentDetailView(generics.RetrieveAPIView):
    """
    GET /api/fandoms/content/<slug_or_id>/
    """
    queryset = Content.objects.filter(is_published=True).select_related('category').prefetch_related('ratings', 'bookmarks')
    serializer_class = ContentDetailSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        lookup = self.kwargs.get('pk') or self.kwargs.get('slug')
        if str(lookup).isdigit():
            return generics.get_object_or_404(self.get_queryset(), pk=int(lookup))
        return generics.get_object_or_404(self.get_queryset(), slug=lookup)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Content.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@extend_schema(tags=['Fandoms'], summary='Character dossiers filtered by universe')
class CharacterRosterViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/fandoms/characters/
    Delivers card-based character dossiers filtered by fandom universe.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = CharacterProfileSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = CharacterProfile.objects.all().select_related('category')
        category = self.request.query_params.get('category')
        search_query = self.request.query_params.get('search') or self.request.query_params.get('q')

        if category:
            if str(category).isdigit():
                qs = qs.filter(category_id=int(category))
            else:
                qs = qs.filter(category__slug=category)

        if search_query:
            qs = SearchVectorEngine.search_characters(qs, search_query)

        return qs.order_by('name')


CharacterRosterView = CharacterRosterViewSet
