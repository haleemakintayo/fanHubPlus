# fandoms/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryListView,
    CategoryViewSet,
    ContentExplorerViewSet,
    ContentDetailView,
    CharacterRosterViewSet,
    CharacterSubmissionView,
    AdminCharacterSubmissionViewSet,
    StreamDiscoverView,
    StreamMediaViewSet,
    StreamMediaRateView,
    StreamMediaLikeView,
)

app_name = 'fandoms'

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'content', ContentExplorerViewSet, basename='content')
router.register(r'characters', CharacterRosterViewSet, basename='character')
router.register(r'character-submissions/manage', AdminCharacterSubmissionViewSet, basename='character-submission-manage')
router.register(r'stream-media', StreamMediaViewSet, basename='stream-media')

urlpatterns = [
    path('categories/list/', CategoryListView.as_view(), name='category_list'),
    path('content/<str:slug>/detail/', ContentDetailView.as_view(), name='content_detail_lookup'),
    path('character-submissions/', CharacterSubmissionView.as_view(), name='character_submissions'),
    path('stream-discover/', StreamDiscoverView.as_view(), name='stream_discover'),
    path('stream-discover/<str:slug>/rate/', StreamMediaRateView.as_view(), name='stream_discover_rate'),
    path('stream-discover/<str:slug>/like/', StreamMediaLikeView.as_view(), name='stream_discover_like'),
    path('', include(router.urls)),
]

