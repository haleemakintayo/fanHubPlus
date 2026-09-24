# chatbot/admin.py

from django.contrib import admin
from .models import ChatbotFAQ, ChatbotQuery


@admin.register(ChatbotFAQ)
class ChatbotFAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'universe_name', 'badge', 'is_active', 'created_at')
    list_filter = ('is_active', 'category', 'universe_name')
    search_fields = ('question', 'answer', 'tags')
    list_editable = ('is_active',)


@admin.register(ChatbotQuery)
class ChatbotQueryAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'user', 'message', 'matched_faq', 'latency_ms', 'created_at')
    list_filter = ('created_at', 'matched_faq')
    search_fields = ('session_id', 'message', 'response', 'user__username', 'user__email')
    readonly_fields = ('user', 'session_id', 'message', 'response', 'matched_faq', 'latency_ms', 'created_at')
