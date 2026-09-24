# fandoms/serializers.py

from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from .models import Category, Content, CharacterProfile


class CategorySerializer(serializers.ModelSerializer):
    contents_count = serializers.IntegerField(source='contents.count', read_only=True)
    characters_count = serializers.IntegerField(source='characters.count', read_only=True)

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
            'content_type',
            'media_url',
            'thumbnail_url',
            'synopsis',
            'artist_or_author',
            'duration',
            'release_date',
            'release_year',
            'popularity_score',
            'view_count',
            'is_bookmarked',
            'average_rating',
            'ratings_count',
            'created_at',
        ]

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
        fields = ContentListSerializer.Meta.fields + ['body_text', 'user_rating', 'updated_at']

    @extend_schema_field(serializers.IntegerField(allow_null=True))
    def get_user_rating(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            r = obj.ratings.filter(user=request.user).first()
            return r.score if r else None
        return None


class CharacterProfileSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = CharacterProfile
        fields = [
            'id',
            'name',
            'slug',
            'alias',
            'category',
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
