# chatbot/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ChatbotMessageAPIView,
    ChatbotHistoryView,
    FAQKnowledgeBaseView,
    AdminChatbotFAQViewSet,
    AdminChatbotTuneView,
)

app_name = 'chatbot'

router = DefaultRouter()
router.register(r'faqs/manage', AdminChatbotFAQViewSet, basename='faq_manage')

urlpatterns = [
    path('query/', ChatbotMessageAPIView.as_view(), name='query'),
    path('history/', ChatbotHistoryView.as_view(), name='history'),
    path('faqs/', FAQKnowledgeBaseView.as_view(), name='faqs'),
    path('audit/', AdminChatbotTuneView.as_view(), name='audit'),
    path('', include(router.urls)),
]
