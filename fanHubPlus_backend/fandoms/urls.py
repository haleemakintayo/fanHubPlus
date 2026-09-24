# fandoms/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryListView,
    CategoryViewSet,
    ContentExplorerViewSet,
    ContentDetailView,
    CharacterRosterViewSet,
)

app_name = 'fandoms'

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'content', ContentExplorerViewSet, basename='content')
router.register(r'characters', CharacterRosterViewSet, basename='character')

urlpatterns = [
    path('categories/list/', CategoryListView.as_view(), name='category_list'),
    path('content/<str:slug>/detail/', ContentDetailView.as_view(), name='content_detail_lookup'),
    path('', include(router.urls)),
]
