# interactions/serializers.py

from rest_framework import serializers
from .models import Bookmark, ContentRating, FanSubmission, Feedback, UserActivity
from fandoms.serializers import CategorySerializer, ContentListSerializer
from fandoms.models import Content, Category


class BookmarkSerializer(serializers.ModelSerializer):
    content_details = ContentListSerializer(source='content', read_only=True)
    content_id = serializers.PrimaryKeyRelatedField(
        queryset=Content.objects.all(),
        source='content',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Bookmark
        fields = [
            'id',
            'content_id',
            'content_details',
            'external_id',
            'item_title',
            'item_type',
            'category_name',
            'thumbnail_url',
            'note',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ContentRatingSerializer(serializers.ModelSerializer):
    content_id = serializers.PrimaryKeyRelatedField(
        queryset=Content.objects.all(),
        source='content',
        write_only=True
    )

    class Meta:
        model = ContentRating
        fields = ['id', 'content_id', 'score', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class FanSubmissionSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    category_details = CategorySerializer(source='category', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    category_slug = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = FanSubmission
        fields = [
            'id',
            'user_username',
            'category_id',
            'category_slug',
            'category_details',
            'title',
            'body',
            'status',
            'admin_feedback',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'status', 'admin_feedback', 'created_at', 'updated_at']

    def validate(self, attrs):
        category = attrs.get('category')
        category_slug = attrs.pop('category_slug', None)
        if not category and category_slug:
            cat = Category.objects.filter(slug=category_slug).first() or Category.objects.filter(name__iexact=category_slug).first()
            if not cat:
                cat = Category.objects.first()
            if cat:
                attrs['category'] = cat
        if not attrs.get('category'):
            default_cat = Category.objects.first()
            if default_cat:
                attrs['category'] = default_cat
            else:
                raise serializers.ValidationError({'category_id': 'A valid category is required.'})
        return attrs


class AdminModerationActionSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['APPROVED', 'REJECTED', 'PENDING'])
    admin_feedback = serializers.CharField(required=False, allow_blank=True, default='')


class FeedbackSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True, default='')

    class Meta:
        model = Feedback
        fields = [
            'id',
            'user_username',
            'email',
            'name',
            'feedback_type',
            'subject',
            'message',
            'status',
            'created_at',
        ]
        read_only_fields = ['id', 'status', 'created_at']


class AdminFeedbackSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True, default='')

    class Meta:
        model = Feedback
        fields = [
            'id',
            'user_username',
            'email',
            'name',
            'feedback_type',
            'subject',
            'message',
            'status',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class UserActivitySerializer(serializers.ModelSerializer):
    action_display = serializers.CharField(source='get_action_type_display', read_only=True)

    class Meta:
        model = UserActivity
        fields = [
            'id',
            'action_type',
            'action_display',
            'target_type',
            'target_id',
            'target_title',
            'category_name',
            'detail',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
