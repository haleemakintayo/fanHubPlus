# accounts/views.py

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema, OpenApiResponse

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    ProfileSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)
from .services import DashboardAggregatorService, PasswordResetService

User = get_user_model()


class RegisterView(APIView):
    """
    POST /api/accounts/register/
    Validates unique emails, registers a new Member user, links favorite categories,
    and returns JWT credentials.
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Accounts'],
        summary='Register a new Member user',
        request=RegisterSerializer,
        responses={
            201: OpenApiResponse(description='User registered successfully with JWT access and refresh tokens.')
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'User registered successfully.',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


RegistrationAPIView = RegisterView


class TokenAuthView(APIView):
    """
    POST /api/accounts/login/
    Authenticates email and password, returning user data and JWT tokens.
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Accounts'],
        summary='Authenticate user with email and password',
        request=LoginSerializer,
        responses={
            200: OpenApiResponse(description='Login successful with JWT access and refresh tokens.')
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful.',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)


LoginView = TokenAuthView


class UserDashboardView(APIView):
    """
    GET /api/accounts/dashboard/
    Consolidates user profile metadata, active bookmarks, submissions, and recommendations.
    """
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        tags=['Accounts'],
        summary='Retrieve personalized user dashboard payload',
        responses={
            200: OpenApiResponse(description='Aggregated dashboard with bookmarks, submissions, and recommendations.')
        }
    )
    def get(self, request, *args, **kwargs):
        dashboard_data = DashboardAggregatorService.get_user_dashboard(request.user)
        return Response(dashboard_data, status=status.HTTP_200_OK)


UserDashboardAPIView = UserDashboardView


class ProfileUpdateView(APIView):
    """
    GET /api/accounts/profile/
    PATCH /api/accounts/profile/
    Inspect and modify user theme, bio, avatar, and favorite fandoms.
    """
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        tags=['Accounts'],
        summary='Retrieve current user profile preferences',
        responses={200: ProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        tags=['Accounts'],
        summary='Partially update user profile preferences',
        request=ProfileSerializer,
        responses={200: ProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


ProfileView = ProfileUpdateView


class PasswordResetRequestView(APIView):
    """
    POST /api/accounts/password-reset/
    Generates a password reset token for the given email.
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Accounts'],
        summary='Request password reset token',
        request=PasswordResetRequestSerializer,
        responses={200: OpenApiResponse(description='Password reset token generated.')}
    )
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            token_data = PasswordResetService.generate_reset_token(user)
            return Response({
                'message': 'Password reset link generated.',
                'reset_data': token_data
            }, status=status.HTTP_200_OK)

        return Response({
            'message': 'If that email exists in our system, a reset link has been dispatched.'
        }, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    """
    POST /api/accounts/password-reset/confirm/
    Validates reset token and sets new password.
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Accounts'],
        summary='Confirm password reset with token',
        request=PasswordResetConfirmSerializer,
        responses={
            200: OpenApiResponse(description='Password reset successfully.'),
            400: OpenApiResponse(description='Invalid or expired token.')
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        success, msg = PasswordResetService.validate_and_reset(
            uidb64=serializer.validated_data['uid'],
            token=serializer.validated_data['token'],
            new_password=serializer.validated_data['new_password'],
        )

        if not success:
            return Response({'error': msg}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': msg}, status=status.HTTP_200_OK)
