# events/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EventRadarMapView,
    EventCalendarListView,
    EventDetailView,
    AdminEventViewSet,
    EventICSExportView,
)

app_name = 'events'

router = DefaultRouter()
router.register(r'manage', AdminEventViewSet, basename='event_manage')

urlpatterns = [
    path('', include(router.urls)),
    path('radar/', EventRadarMapView.as_view(), name='radar_map'),
    path('calendar/', EventCalendarListView.as_view(), name='calendar_list'),
    path('<str:slug>/', EventDetailView.as_view(), name='detail'),
    path('<str:slug>/ics/', EventICSExportView.as_view(), name='ics_export'),
]
