"""
URL configuration for fanhub project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from accounts.views import RegisterView, TokenAuthView, UserDashboardView
from fandoms.views import ContentExplorerViewSet, ContentDetailView
from events.views import EventRadarMapView
from chatbot.views import ChatbotMessageAPIView
from interactions.views import FanSubmissionView, RatingSubmitView, BookmarkToggleAPIView

urlpatterns = [
    path('admin/', admin.site.urls),

    # OpenAPI Schema & Swagger Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui-alias'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # Domain REST Endpoints
    path('api/accounts/', include('accounts.urls', namespace='accounts')),
    path('api/fandoms/', include('fandoms.urls', namespace='fandoms')),
    path('api/merchandise/', include('merchandise.urls', namespace='merchandise')),
    path('api/events/', include('events.urls', namespace='events')),
    path('api/interactions/', include('interactions.urls', namespace='interactions')),
    path('api/chatbot/', include('chatbot.urls', namespace='chatbot')),

    # Direct Blueprint Flow Compatibility Aliases
    path('api/register', RegisterView.as_view(), name='flow_register_no_slash'),
    path('api/register/', RegisterView.as_view(), name='flow_register'),
    path('api/login', TokenAuthView.as_view(), name='flow_login_no_slash'),
    path('api/login/', TokenAuthView.as_view(), name='flow_login'),
    path('api/dashboard', UserDashboardView.as_view(), name='flow_dashboard_no_slash'),
    path('api/dashboard/', UserDashboardView.as_view(), name='flow_dashboard'),
    path('api/content/', ContentExplorerViewSet.as_view({'get': 'list'}), name='flow_content_list'),
    path('api/content/<slug:slug>/', ContentDetailView.as_view(), name='flow_content_detail'),
    path('api/events/radar', EventRadarMapView.as_view(), name='flow_radar_no_slash'),
    path('api/chatbot', ChatbotMessageAPIView.as_view(), name='flow_chatbot_no_slash'),
    path('api/fan-submissions', FanSubmissionView.as_view(), name='flow_fan_submissions_no_slash'),
    path('api/fan-submissions/', FanSubmissionView.as_view(), name='flow_fan_submissions'),
    path('content/<int:content_id>/rate', RatingSubmitView.as_view(), name='flow_rate_content'),
    path('content/<int:content_id>/rate/', RatingSubmitView.as_view(), name='flow_rate_content_slash'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
