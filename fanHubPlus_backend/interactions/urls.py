# interactions/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BookmarkToggleAPIView,
    RatingSubmitView,
    FanSubmissionView,
    AdminModerationViewSet,
    FeedbackView,
)

app_name = 'interactions'

router = DefaultRouter()
router.register(r'moderation', AdminModerationViewSet, basename='moderation')

urlpatterns = [
    path('bookmarks/toggle/', BookmarkToggleAPIView.as_view(), name='bookmark_toggle'),
    path('ratings/', RatingSubmitView.as_view(), name='rating_submit'),
    path('submissions/', FanSubmissionView.as_view(), name='fan_submissions'),
    path('feedback/', FeedbackView.as_view(), name='feedback'),
    path('', include(router.urls)),
]
