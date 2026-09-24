# interactions/serializers.py

from rest_framework import serializers
from .models import Bookmark, ContentRating, FanSubmission, Feedback
from fandoms.serializers import CategorySerializer, ContentListSerializer
from fandoms.models import Content, Category


class BookmarkSerializer(serializers.ModelSerializer):
    content_details = ContentListSerializer(source='content', read_only=True)
    content_id = serializers.PrimaryKeyRelatedField(
        queryset=Content.objects.all(),
        source='content',
        write_only=True
    )

    class Meta:
        model = Bookmark
        fields = ['id', 'content_id', 'content_details', 'note', 'created_at']
        read_only_fields = ['id', 'created_at']


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
        write_only=True
    )

    class Meta:
        model = FanSubmission
        fields = [
            'id',
            'user_username',
            'category_id',
            'category_details',
            'title',
            'body',
            'status',
            'admin_feedback',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'status', 'admin_feedback', 'created_at', 'updated_at']


class AdminModerationActionSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['APPROVED', 'REJECTED'])
    admin_feedback = serializers.CharField(required=False, allow_blank=True, default='')


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = [
            'id',
            'email',
            'name',
            'feedback_type',
            'subject',
            'message',
            'status',
            'created_at',
        ]
        read_only_fields = ['id', 'status', 'created_at']
