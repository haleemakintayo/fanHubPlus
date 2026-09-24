# fandoms/services.py

import math
from django.db.models import Q
from django.db.models import Avg, Count
import django_filters
from .models import Content, Category


class ContentFilter(django_filters.FilterSet):
    """
    django_filters FilterSet supporting multi-tier lookups across category,
    content_type, release_year, and search keyword.
    """
    category = django_filters.CharFilter(method='filter_category')
    content_type = django_filters.ChoiceFilter(choices=Content.ContentType.choices)
    search = django_filters.CharFilter(method='filter_search')
    release_year = django_filters.CharFilter(field_name='release_year', lookup_expr='icontains')

    class Meta:
        model = Content
        fields = ['category', 'content_type', 'release_year']

    def filter_category(self, queryset, name, value):
        if not value:
            return queryset
        if value.isdigit():
            return queryset.filter(category_id=int(value))
        return queryset.filter(category__slug=value)

    def filter_search(self, queryset, name, value):
        return SearchVectorEngine.search_content(queryset, value)


class SearchVectorEngine:
    """
    Executes full-text search across titles, character names, and rich-text descriptions.
    """
    @staticmethod
    def search_content(queryset, query_string):
        if not query_string:
            return queryset
        tokens = query_string.strip().split()
        q_obj = Q()
        for token in tokens:
            q_obj |= (
                Q(title__icontains=token) |
                Q(synopsis__icontains=token) |
                Q(body_text__icontains=token) |
                Q(artist_or_author__icontains=token) |
                Q(category__name__icontains=token)
            )
        return queryset.filter(q_obj).distinct()

    @staticmethod
    def search_characters(queryset, query_string):
        if not query_string:
            return queryset
        tokens = query_string.strip().split()
        q_obj = Q()
        for token in tokens:
            q_obj |= (
                Q(name__icontains=token) |
                Q(alias__icontains=token) |
                Q(archetype__icontains=token) |
                Q(biography__icontains=token) |
                Q(origin__icontains=token) |
                Q(faction__icontains=token)
            )
        return queryset.filter(q_obj).distinct()


class ContentFilterService:
    """
    Orchestrates complex SQL lookups across categories, content types,
    release years, and popularity rankings.
    """
    SORT_MAP = {
        'popular': '-popularity_score',
        'latest': '-created_at',
        'oldest': 'created_at',
        'alpha': 'title',
        '-alpha': '-title',
        'views': '-view_count',
    }

    @classmethod
    def apply_filters(cls, queryset, params):
        category = params.get('category')
        content_type = params.get('content_type') or params.get('type')
        search_query = params.get('search') or params.get('q')
        sort_key = params.get('sort', 'popular')
        release_year = params.get('release_year') or params.get('year')

        if category:
            if str(category).isdigit():
                queryset = queryset.filter(category_id=int(category))
            else:
                queryset = queryset.filter(category__slug=category)

        if content_type:
            queryset = queryset.filter(content_type__iexact=content_type)

        if release_year:
            queryset = queryset.filter(release_year__icontains=release_year)

        if search_query:
            queryset = SearchVectorEngine.search_content(queryset, search_query)

        order_by = cls.SORT_MAP.get(sort_key, '-popularity_score')
        return queryset.order_by(order_by)


class PopularityEngine:
    """
    Recalculates popularity scores using the formula:
    Score = (Rating_avg * 0.7) + (log10(Bookmarks + 1) * 0.3)
    """
    @staticmethod
    def calculate_score(avg_rating, bookmark_count):
        avg = float(avg_rating or 0.0)
        b_count = int(bookmark_count or 0)
        # Using math.log10(b_count + 1)
        score = (avg * 0.7) + (math.log10(b_count + 1) * 0.3)
        return round(score, 3)

    @classmethod
    def recalculate_for_content(cls, content):
        from interactions.models import ContentRating, Bookmark
        stats = ContentRating.objects.filter(content=content).aggregate(
            avg_rating=Avg('score')
        )
        bookmarks_count = Bookmark.objects.filter(content=content).count()
        new_score = cls.calculate_score(stats['avg_rating'], bookmarks_count)
        content.popularity_score = new_score
        content.save(update_fields=['popularity_score'])
        return new_score
