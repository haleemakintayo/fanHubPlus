# chatbot/models.py

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class ChatbotFAQ(models.Model):
    """
    Pre-configured Q&A pairs with relevance tags and categories for deterministic lookup.
    Enables low-latency answers without external API consumption.
    """
    question = models.CharField(max_length=255, db_index=True)
    answer = models.TextField()
    category = models.ForeignKey(
        'fandoms.Category',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='faq_entries'
    )
    universe_name = models.CharField(max_length=100, blank=True, help_text=_('e.g. Anime, Comics, Gaming'))
    badge = models.CharField(max_length=100, default='Curated FAQ', help_text=_('Tagline badge e.g. Anime Lore • Curated'))
    tags = models.JSONField(default=list, blank=True, help_text=_('Keywords or trigger phrases'))
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Chatbot FAQ')
        verbose_name_plural = _('Chatbot FAQs')
        ordering = ['question']

    def __str__(self):
        return self.question


class ChatbotQuery(models.Model):
    """
    Audit table logging inbound queries, answers, session tracking, and response latency.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='chatbot_queries'
    )
    session_id = models.CharField(max_length=100, db_index=True)
    message = models.TextField()
    response = models.TextField()
    matched_faq = models.ForeignKey(
        ChatbotFAQ,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='logged_queries'
    )
    latency_ms = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = _('Chatbot Query Audit')
        verbose_name_plural = _('Chatbot Query Audits')
        ordering = ['-created_at']

    def __str__(self):
        return f"Query [{self.session_id[:8]}] - {self.message[:30]}"
