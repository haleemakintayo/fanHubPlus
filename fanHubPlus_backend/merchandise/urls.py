# merchandise/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MerchandiseGalleryAPIView,
    MerchandiseDetailAPIView,
    AdminMerchandiseViewSet,
    UpcomingDropsView,
    MerchandiseTrackClickAPIView,
)

app_name = 'merchandise'

router = DefaultRouter()
router.register(r'manage', AdminMerchandiseViewSet, basename='merchandise_manage')

urlpatterns = [
    path('', MerchandiseGalleryAPIView.as_view(), name='gallery'),
    path('', include(router.urls)),
    path('upcoming/', UpcomingDropsView.as_view(), name='upcoming_drops'),
    path('<str:slug>/', MerchandiseDetailAPIView.as_view(), name='detail'),
    path('<str:identifier>/track-click/', MerchandiseTrackClickAPIView.as_view(), name='track_click'),
]
