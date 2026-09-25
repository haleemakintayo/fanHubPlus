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
from interactions.views import IsAdminOrReadOnly


class DualLookupMixin:
    """
    Allows ViewSets to resolve objects by either numeric primary key or slug.
    """
    def get_object(self):
        lookup = self.kwargs.get(self.lookup_field) or self.kwargs.get('pk') or self.kwargs.get('slug')
        qs = self.get_queryset()
        if str(lookup).isdigit():
            obj = qs.filter(pk=int(lookup)).first()
            if obj:
                self.check_object_permissions(self.request, obj)
                return obj
        obj = generics.get_object_or_404(qs, slug=lookup)
        self.check_object_permissions(self.request, obj)
        return obj


@extend_schema(tags=['Fandoms'], summary='List all fandom categories')
class CategoryListView(generics.ListAPIView):
    """
    GET /api/fandoms/categories/list/
    Returns all fandom categories with icons, quotes, and metadata.
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


@extend_schema(tags=['Fandoms'])
class CategoryViewSet(DualLookupMixin, viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    pagination_class = None


@extend_schema(
    tags=['Fandoms'],
    summary='Explore and manage content with genre filtering, multi-tier search, and Admin CRUD'
)
class ContentExplorerViewSet(DualLookupMixin, viewsets.ModelViewSet):
    """
    GET /api/fandoms/content/
    POST/PATCH/DELETE /api/fandoms/content/<slug_or_id>/ (Admin only)
    Supports multi-tier search, genre filtering, sorting, and Admin CRUD across all 8 fandom categories.
    """
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ContentFilter
    ordering_fields = ['popularity_score', 'created_at', 'title', 'view_count']
    ordering = ['-popularity_score']
    lookup_field = 'slug'

    def get_queryset(self):
        is_admin = bool(
            self.request.user and
            self.request.user.is_authenticated and
            (getattr(self.request.user, 'role', '') == 'ADMIN' or self.request.user.is_staff or self.request.user.is_superuser)
        )
        include_unpub = self.request.query_params.get('include_unpublished', '').lower() in ['true', '1']
        if is_admin and (include_unpub or self.request.method not in permissions.SAFE_METHODS):
            qs = Content.objects.all().select_related('category').prefetch_related('ratings', 'bookmarks')
        else:
            qs = Content.objects.filter(is_published=True).select_related('category').prefetch_related('ratings', 'bookmarks')
        return ContentFilterService.apply_filters(qs, self.request.query_params)

    def get_serializer_class(self):
        if self.action in ['retrieve', 'create', 'update', 'partial_update']:
            return ContentDetailSerializer
        return ContentListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Content.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        instance.refresh_from_db()
        if request.user and request.user.is_authenticated:
            try:
                from interactions.models import UserActivity
                UserActivity.objects.create(
                    user=request.user,
                    action_type=UserActivity.ActionType.VIEW,
                    target_type=instance.content_type,
                    target_id=instance.slug,
                    target_title=instance.title,
                    category_name=instance.category.name if instance.category else '',
                    detail=f"Viewed {instance.get_content_type_display()}"
                )
            except Exception:
                pass
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


ContentExplorerView = ContentExplorerViewSet


@extend_schema(tags=['Fandoms'], summary='Retrieve content detail and increment view count')
class ContentDetailView(generics.RetrieveAPIView):
    """
    GET /api/fandoms/content/<slug_or_id>/detail/
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


@extend_schema(tags=['Fandoms'], summary='Character dossiers filtered by universe with Admin CRUD')
class CharacterRosterViewSet(DualLookupMixin, viewsets.ModelViewSet):
    """
    GET /api/fandoms/characters/
    POST/PATCH/DELETE /api/fandoms/characters/<slug_or_id>/ (Admin only)
    Delivers card-based character dossiers filtered by fandom universe.
    """
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CharacterProfileSerializer
    lookup_field = 'slug'
    pagination_class = None

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
