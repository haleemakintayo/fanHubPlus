"""
URL configuration for fanhub project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from accounts.views import (
    RegisterView,
    TokenAuthView,
    UserDashboardView,
    ProfileUpdateView,
    AdminAnalyticsAPIView,
)
from fandoms.views import (
    CategoryListView,
    ContentExplorerViewSet,
    ContentDetailView,
    CharacterRosterViewSet,
)
from events.views import EventRadarMapView
from chatbot.views import ChatbotMessageAPIView
from interactions.views import (
    FanSubmissionView,
    RatingSubmitView,
    BookmarkToggleAPIView,
    BookmarkNoteAPIView,
    FeedbackView,
    AdminModerationViewSet,
)


class LogoutAliasView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        return Response({"detail": "Successfully logged out."}, status=200)


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

    # Direct Blueprint & Checklist Route Aliases
    path('api/register', RegisterView.as_view(), name='flow_register_no_slash'),
    path('api/register/', RegisterView.as_view(), name='flow_register'),
    path('api/auth/register', RegisterView.as_view(), name='checklist_auth_register_no_slash'),
    path('api/auth/register/', RegisterView.as_view(), name='checklist_auth_register'),
    path('api/login', TokenAuthView.as_view(), name='flow_login_no_slash'),
    path('api/login/', TokenAuthView.as_view(), name='flow_login'),
    path('api/auth/login', TokenAuthView.as_view(), name='checklist_auth_login_no_slash'),
    path('api/auth/login/', TokenAuthView.as_view(), name='checklist_auth_login'),
    path('api/auth/logout', LogoutAliasView.as_view(), name='checklist_auth_logout_no_slash'),
    path('api/auth/logout/', LogoutAliasView.as_view(), name='checklist_auth_logout'),
    path('api/users/me', ProfileUpdateView.as_view(), name='checklist_users_me_no_slash'),
    path('api/users/me/', ProfileUpdateView.as_view(), name='checklist_users_me'),
    path('api/dashboard', UserDashboardView.as_view(), name='flow_dashboard_no_slash'),
    path('api/dashboard/', UserDashboardView.as_view(), name='flow_dashboard'),

    # Categories, Content & Characters Aliases
    path('api/categories', CategoryListView.as_view(), name='checklist_categories_no_slash'),
    path('api/categories/', CategoryListView.as_view(), name='checklist_categories'),
    path('api/content', ContentExplorerViewSet.as_view({'get': 'list', 'post': 'create'}), name='flow_content_list_no_slash'),
    path('api/content/', ContentExplorerViewSet.as_view({'get': 'list', 'post': 'create'}), name='flow_content_list'),
    path('api/content/<slug:slug>/', ContentDetailView.as_view(), name='flow_content_detail'),
    path('api/content/<int:content_id>/rate', RatingSubmitView.as_view(), name='checklist_rate_content_no_slash'),
    path('api/content/<int:content_id>/rate/', RatingSubmitView.as_view(), name='checklist_rate_content'),
    path('content/<int:content_id>/rate', RatingSubmitView.as_view(), name='flow_rate_content'),
    path('content/<int:content_id>/rate/', RatingSubmitView.as_view(), name='flow_rate_content_slash'),
    path('api/characters', CharacterRosterViewSet.as_view({'get': 'list'}), name='checklist_characters_no_slash'),
    path('api/characters/', CharacterRosterViewSet.as_view({'get': 'list'}), name='checklist_characters'),

    # Bookmarks, Submissions, Feedback & Events Aliases
    path('api/bookmarks', BookmarkToggleAPIView.as_view(), name='checklist_bookmarks_no_slash'),
    path('api/bookmarks/', BookmarkToggleAPIView.as_view(), name='checklist_bookmarks'),
    path('api/bookmarks/<int:pk>', BookmarkNoteAPIView.as_view(), name='checklist_bookmark_detail_no_slash'),
    path('api/bookmarks/<int:pk>/', BookmarkNoteAPIView.as_view(), name='checklist_bookmark_detail'),
    path('api/events/radar', EventRadarMapView.as_view(), name='flow_radar_no_slash'),
    path('api/chatbot', ChatbotMessageAPIView.as_view(), name='flow_chatbot_no_slash'),
    path('api/fan-submissions', FanSubmissionView.as_view(), name='flow_fan_submissions_no_slash'),
    path('api/fan-submissions/', FanSubmissionView.as_view(), name='flow_fan_submissions'),
    path('api/submissions', FanSubmissionView.as_view(), name='checklist_submissions_no_slash'),
    path('api/submissions/', FanSubmissionView.as_view(), name='checklist_submissions'),
    path('api/feedback', FeedbackView.as_view(), name='checklist_feedback_no_slash'),
    path('api/feedback/', FeedbackView.as_view(), name='checklist_feedback'),

    # Admin Control Panel Route Aliases
    path('api/admin/analytics', AdminAnalyticsAPIView.as_view(), name='checklist_admin_analytics_no_slash'),
    path('api/admin/analytics/', AdminAnalyticsAPIView.as_view(), name='checklist_admin_analytics'),
    path('api/admin/submissions/pending', AdminModerationViewSet.as_view({'get': 'list'}), name='checklist_admin_pending_no_slash'),
    path('api/admin/submissions/pending/', AdminModerationViewSet.as_view({'get': 'list'}), name='checklist_admin_pending'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
