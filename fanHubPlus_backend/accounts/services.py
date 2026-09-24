# accounts/services.py

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.db.models import Count, Avg

User = get_user_model()


class DashboardAggregatorService:
    """
    Compiles user profile metrics, retrieves active bookmarks,
    recent ratings, fan submissions, and builds personalized category recommendations.
    """
    @staticmethod
    def get_user_dashboard(user):
        profile = getattr(user, 'profile', None)
        favorite_categories = profile.favorite_categories.all() if profile else []
        favorite_category_ids = [cat.id for cat in favorite_categories]

        # Fetch active bookmarks
        bookmarks = []
        try:
            from interactions.models import Bookmark
            bookmarks_qs = Bookmark.objects.filter(user=user).select_related('content', 'content__category').order_by('-created_at')[:10]
            bookmarks = [
                {
                    'id': b.id,
                    'content_id': b.content.id,
                    'content_title': b.content.title,
                    'content_slug': b.content.slug,
                    'content_type': b.content.content_type,
                    'category_name': b.content.category.name if b.content.category else '',
                    'thumbnail_url': b.content.thumbnail_url or b.content.media_url,
                    'note': b.note,
                    'created_at': b.created_at,
                }
                for b in bookmarks_qs
            ]
        except Exception:
            bookmarks = []

        # Fetch user's fan submissions
        fan_submissions = []
        try:
            from interactions.models import FanSubmission
            submissions_qs = FanSubmission.objects.filter(user=user).select_related('category').order_by('-created_at')[:5]
            fan_submissions = [
                {
                    'id': sub.id,
                    'title': sub.title,
                    'category': sub.category.name if sub.category else '',
                    'status': sub.status,
                    'created_at': sub.created_at,
                }
                for sub in submissions_qs
            ]
        except Exception:
            fan_submissions = []

        # Build personalized recommendations from favorite categories
        recommendations = []
        try:
            from fandoms.models import Content
            if favorite_category_ids:
                rec_qs = Content.objects.filter(
                    category_id__in=favorite_category_ids,
                    is_published=True
                ).select_related('category').order_by('-popularity_score', '-created_at')[:8]
            else:
                rec_qs = Content.objects.filter(
                    is_published=True
                ).select_related('category').order_by('-popularity_score', '-created_at')[:8]

            recommendations = [
                {
                    'id': item.id,
                    'title': item.title,
                    'slug': item.slug,
                    'content_type': item.content_type,
                    'category_id': item.category_id,
                    'category_name': item.category.name if item.category else '',
                    'category_slug': item.category.slug if item.category else '',
                    'popularity_score': item.popularity_score,
                    'thumbnail_url': item.thumbnail_url or item.media_url,
                    'synopsis': item.synopsis,
                }
                for item in rec_qs
            ]
        except Exception:
            recommendations = []

        # Activity stats
        ratings_count = 0
        try:
            from interactions.models import ContentRating
            ratings_count = ContentRating.objects.filter(user=user).count()
        except Exception:
            ratings_count = 0

        return {
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'role': user.role,
                'is_verified': user.is_verified,
            },
            'profile': {
                'bio': profile.bio if profile else '',
                'avatar': (profile.avatar.url if hasattr(profile.avatar, 'url') else str(profile.avatar)) if profile and profile.avatar else None,
                'theme_preference': profile.theme_preference if profile else 'LIGHT',
                'font_size_preference': profile.font_size_preference if profile else 'NORMAL',
                'favorite_categories': [
                    {
                        'id': cat.id,
                        'name': cat.name,
                        'slug': cat.slug,
                        'icon': cat.icon,
                        'accent_color': getattr(cat, 'accent_color', '#38BDF8'),
                    }
                    for cat in favorite_categories
                ],
            },
            'stats': {
                'bookmarks_count': len(bookmarks),
                'submissions_count': len(fan_submissions),
                'ratings_count': ratings_count,
            },
            'bookmarks': bookmarks,
            'recent_submissions': fan_submissions,
            'personalized_recommendations': recommendations,
        }


class PasswordResetService:
    """
    Handles secure generation of password reset tokens and resetting user passwords.
    """
    @staticmethod
    def generate_reset_token(user):
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        return {'uid': uid, 'token': token}

    @staticmethod
    def validate_and_reset(uidb64, token, new_password):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return False, "Invalid reset link."

        if not default_token_generator.check_token(user, token):
            return False, "Token has expired or is invalid."

        user.set_password(new_password)
        user.save()
        return True, "Password reset successfully."
