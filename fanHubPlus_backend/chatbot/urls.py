# chatbot/urls.py

from django.urls import path
from .views import (
    ChatbotMessageAPIView,
    FAQKnowledgeBaseView,
    AdminChatbotTuneView,
)

app_name = 'chatbot'

urlpatterns = [
    path('query/', ChatbotMessageAPIView.as_view(), name='query'),
    path('faqs/', FAQKnowledgeBaseView.as_view(), name='faqs'),
    path('audit/', AdminChatbotTuneView.as_view(), name='audit'),
]
