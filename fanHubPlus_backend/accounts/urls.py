# accounts/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    TokenAuthView,
    UserDashboardView,
    ProfileUpdateView,
    AdminAnalyticsAPIView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenAuthView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', UserDashboardView.as_view(), name='dashboard'),
    path('profile/', ProfileUpdateView.as_view(), name='profile'),
    path('admin/analytics/', AdminAnalyticsAPIView.as_view(), name='admin_analytics'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
