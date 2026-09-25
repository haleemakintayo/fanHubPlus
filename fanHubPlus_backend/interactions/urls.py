# interactions/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BookmarkToggleAPIView,
    BookmarkNoteAPIView,
    UserActivityListCreateAPIView,
    RatingSubmitView,
    FanSubmissionView,
    AdminModerationViewSet,
    FeedbackView,
    AdminFeedbackViewSet,
)

app_name = 'interactions'

router = DefaultRouter()
router.register(r'moderation', AdminModerationViewSet, basename='moderation')
router.register(r'admin/feedback', AdminFeedbackViewSet, basename='admin_feedback')

urlpatterns = [
    path('bookmarks/', BookmarkToggleAPIView.as_view(), name='bookmarks_list'),
    path('bookmarks/toggle/', BookmarkToggleAPIView.as_view(), name='bookmark_toggle'),
    path('bookmarks/note/', BookmarkNoteAPIView.as_view(), name='bookmark_note'),
    path('bookmarks/<int:pk>/', BookmarkNoteAPIView.as_view(), name='bookmark_detail'),
    path('activity/', UserActivityListCreateAPIView.as_view(), name='user_activity'),
    path('ratings/', RatingSubmitView.as_view(), name='rating_submit'),
    path('submissions/', FanSubmissionView.as_view(), name='fan_submissions'),
    path('feedback/', FeedbackView.as_view(), name='feedback'),
    path('', include(router.urls)),
]
