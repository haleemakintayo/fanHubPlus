# fandoms/serializers.py

from rest_framework import serializers
from django.utils.text import slugify
from drf_spectacular.utils import extend_schema_field
from .models import Category, Content, CharacterProfile


def resolve_category_from_attrs(attrs):
    category = attrs.get('category')
    category_slug = attrs.pop('category_slug', None)
    if not category and category_slug:
        cat = (
            Category.objects.filter(slug=category_slug).first()
            or Category.objects.filter(name__iexact=category_slug).first()
        )
        if not cat and category_slug in ['movies', 'tv-shows', 'tv', 'movies-tv']:
            cat = Category.objects.filter(slug__in=['movies-tv', 'movies', 'tv-shows']).first()
        if not cat:
            cat = Category.objects.first()
        if cat:
            attrs['category'] = cat
    return attrs


class CategorySerializer(serializers.ModelSerializer):
    contents_count = serializers.IntegerField(source='contents.count', read_only=True)
    characters_count = serializers.IntegerField(source='characters.count', read_only=True)
    slug = serializers.SlugField(required=False, allow_blank=True)

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'icon',
            'accent_color',
            'badge_text_color',
            'entry_count',
            'tags',
            'top_pick',
            'featured_quote',
            'contents_count',
            'characters_count',
            'created_at',
        ]


class ContentListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    category_slug = serializers.CharField(write_only=True, required=False)
    slug = serializers.SlugField(required=False, allow_blank=True)
    is_bookmarked = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    ratings_count = serializers.SerializerMethodField()

    class Meta:
        model = Content
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'category_id',
            'category_slug',
            'content_type',
            'media_url',
            'thumbnail_url',
            'body_text',
            'synopsis',
            'artist_or_author',
            'duration',
            'duration_seconds',
            'release_date',
            'release_year',
            'popularity_score',
            'view_count',
            'is_published',
            'is_bookmarked',
            'average_rating',
            'ratings_count',
            'created_at',
        ]

    def validate(self, attrs):
        attrs = resolve_category_from_attrs(attrs)
        if not self.instance and not attrs.get('category'):
            default_cat = Category.objects.first()
            if default_cat:
                attrs['category'] = default_cat
        if not self.instance and not attrs.get('slug') and attrs.get('title'):
            base_slug = slugify(attrs['title']) or 'content-item'
            unique_slug = base_slug
            counter = 1
            while Content.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            attrs['slug'] = unique_slug
        return attrs

    @extend_schema_field(serializers.BooleanField)
    def get_is_bookmarked(self, obj) -> bool:
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookmarks.filter(user=request.user).exists()
        return False

    @extend_schema_field(serializers.FloatField)
    def get_average_rating(self, obj) -> float:
        if hasattr(obj, 'avg_score') and obj.avg_score is not None:
            return round(obj.avg_score, 1)
        ratings = obj.ratings.all()
        if ratings.exists():
            return round(sum(r.score for r in ratings) / len(ratings), 1)
        return 0.0

    @extend_schema_field(serializers.IntegerField)
    def get_ratings_count(self, obj) -> int:
        return obj.ratings.count()


class ContentDetailSerializer(ContentListSerializer):
    user_rating = serializers.SerializerMethodField()

    class Meta(ContentListSerializer.Meta):
        fields = ContentListSerializer.Meta.fields + ['user_rating', 'updated_at']

    @extend_schema_field(serializers.IntegerField(allow_null=True))
    def get_user_rating(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            r = obj.ratings.filter(user=request.user).first()
            return r.score if r else None
        return None


class CharacterProfileSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    category_slug = serializers.CharField(write_only=True, required=False)
    slug = serializers.SlugField(required=False, allow_blank=True)

    class Meta:
        model = CharacterProfile
        fields = [
            'id',
            'name',
            'slug',
            'alias',
            'category',
            'category_id',
            'category_slug',
            'archetype',
            'origin',
            'faction',
            'tagline',
            'biography',
            'image_url',
            'stats_json',
            'details_json',
            'created_at',
        ]

    def validate(self, attrs):
        attrs = resolve_category_from_attrs(attrs)
        if not self.instance and not attrs.get('category'):
            default_cat = Category.objects.first()
            if default_cat:
                attrs['category'] = default_cat
        if not self.instance and not attrs.get('slug') and attrs.get('name'):
            base_slug = slugify(attrs['name']) or 'character'
            unique_slug = base_slug
            counter = 1
            while CharacterProfile.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            attrs['slug'] = unique_slug
        return attrs
