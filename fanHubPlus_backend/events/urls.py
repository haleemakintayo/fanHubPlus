# events/urls.py

from django.urls import path
from .views import (
    EventRadarMapView,
    EventCalendarListView,
    EventDetailView,
    EventICSExportView,
)

app_name = 'events'

urlpatterns = [
    path('radar/', EventRadarMapView.as_view(), name='radar_map'),
    path('calendar/', EventCalendarListView.as_view(), name='calendar_list'),
    path('<str:slug>/', EventDetailView.as_view(), name='detail'),
    path('<str:slug>/ics/', EventICSExportView.as_view(), name='ics_export'),
]
