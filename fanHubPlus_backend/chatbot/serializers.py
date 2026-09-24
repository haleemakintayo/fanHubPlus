# chatbot/serializers.py

from rest_framework import serializers
from .models import ChatbotFAQ, ChatbotQuery
from fandoms.serializers import CategorySerializer


class ChatbotFAQSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = ChatbotFAQ
        fields = [
            'id',
            'question',
            'answer',
            'category',
            'universe_name',
            'badge',
            'tags',
            'is_active',
            'created_at',
        ]


class ChatbotQuerySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ChatbotQuery
        fields = [
            'id',
            'username',
            'session_id',
            'message',
            'response',
            'matched_faq',
            'latency_ms',
            'created_at',
        ]


class ChatbotMessageInputSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)
    session_id = serializers.CharField(required=False, default='default-session')
