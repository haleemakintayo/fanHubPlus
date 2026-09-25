# chatbot/serializers.py

from rest_framework import serializers
from .models import ChatbotFAQ, ChatbotQuery
from fandoms.models import Category
from fandoms.serializers import CategorySerializer, resolve_category_from_attrs


class ChatbotFAQSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )
    category_slug = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = ChatbotFAQ
        fields = [
            'id',
            'question',
            'answer',
            'category',
            'category_id',
            'category_slug',
            'universe_name',
            'badge',
            'tags',
            'is_active',
            'created_at',
        ]

    def validate(self, attrs):
        attrs = resolve_category_from_attrs(attrs)
        cat = attrs.get('category')
        if cat and not attrs.get('universe_name'):
            attrs['universe_name'] = cat.name
        return attrs


class ChatbotQuerySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True, default='Guest')
    matched_faq_question = serializers.CharField(source='matched_faq.question', read_only=True, default=None)

    class Meta:
        model = ChatbotQuery
        fields = [
            'id',
            'username',
            'session_id',
            'message',
            'response',
            'matched_faq',
            'matched_faq_question',
            'latency_ms',
            'created_at',
        ]


class ChatbotMessageInputSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)
    session_id = serializers.CharField(required=False, default='default-session')
