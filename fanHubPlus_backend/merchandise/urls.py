# merchandise/urls.py

from django.urls import path
from .views import (
    MerchandiseGalleryAPIView,
    MerchandiseDetailAPIView,
    UpcomingDropsView,
    MerchandiseTrackClickAPIView,
)

app_name = 'merchandise'

urlpatterns = [
    path('', MerchandiseGalleryAPIView.as_view(), name='gallery'),
    path('upcoming/', UpcomingDropsView.as_view(), name='upcoming_drops'),
    path('<slug:slug>/', MerchandiseDetailAPIView.as_view(), name='detail'),
    path('<str:identifier>/track-click/', MerchandiseTrackClickAPIView.as_view(), name='track_click'),
]
