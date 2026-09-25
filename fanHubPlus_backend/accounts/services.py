# accounts/services.py

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.db.models import Count, Avg, Sum

User = get_user_model()


class DashboardAggregatorService:
    """
    Compiles user profile metrics, retrieves active bookmarks (with personal notes),
    recent activity stream, recent ratings, fan submissions, and personalized category recommendations.
    """
    @staticmethod
    def get_user_dashboard(user):
        profile = getattr(user, 'profile', None)
        favorite_categories = list(profile.favorite_categories.all()) if profile else []
        favorite_category_ids = [cat.id for cat in favorite_categories]

        # Fetch active bookmarks (supporting Content, Characters, Videos, Merchandise, and personal notes)
        bookmarks = []
        notes_count = 0
        try:
            from interactions.models import Bookmark
            bookmarks_qs = Bookmark.objects.filter(user=user).select_related('content', 'content__category').order_by('-created_at')[:30]
            for b in bookmarks_qs:
                if b.note and b.note.strip():
                    notes_count += 1
                title = b.item_title or (b.content.title if b.content else b.external_id)
                slug = b.external_id or (b.content.slug if b.content else str(b.id))
                c_type = b.item_type or (b.content.content_type if b.content else 'ARTICLE')
                cat_name = b.category_name or (b.content.category.name if b.content and b.content.category else 'Multiverse')
                thumb = b.thumbnail_url or (b.content.thumbnail_url or b.content.media_url if b.content else None)
                bookmarks.append({
                    'id': b.id,
                    'content_id': b.content_id,
                    'external_id': slug,
                    'content_title': title,
                    'content_slug': slug,
                    'content_type': c_type,
                    'category_name': cat_name,
                    'thumbnail_url': thumb,
                    'note': b.note or '',
                    'created_at': b.created_at,
                    'updated_at': getattr(b, 'updated_at', b.created_at),
                })
        except Exception:
            bookmarks = []

        # Fetch user's fan submissions
        fan_submissions = []
        try:
            from interactions.models import FanSubmission
            submissions_qs = FanSubmission.objects.filter(user=user).select_related('category').order_by('-created_at')[:10]
            fan_submissions = [
                {
                    'id': sub.id,
                    'title': sub.title,
                    'body': sub.body,
                    'category': sub.category.name if sub.category else '',
                    'category_slug': sub.category.slug if sub.category else '',
                    'status': sub.status,
                    'admin_feedback': sub.admin_feedback,
                    'created_at': sub.created_at,
                }
                for sub in submissions_qs
            ]
        except Exception:
            fan_submissions = []

        # Build unified Recent Activity Stream
        recent_activity = []
        try:
            from interactions.models import UserActivity, ContentRating
            activities_qs = UserActivity.objects.filter(user=user).order_by('-created_at')[:20]
            for act in activities_qs:
                recent_activity.append({
                    'id': f"act-{act.id}",
                    'action_type': act.action_type,
                    'action_label': act.get_action_type_display(),
                    'target_type': act.target_type,
                    'target_id': act.target_id,
                    'target_title': act.target_title,
                    'category_name': act.category_name or 'Multiverse',
                    'detail': act.detail,
                    'created_at': act.created_at,
                })

            # If UserActivity table has few entries, synthesize from existing bookmarks, ratings, and submissions
            if len(recent_activity) < 5:
                seen_titles = {a['target_title'] for a in recent_activity}
                for b in bookmarks[:5]:
                    if b['content_title'] not in seen_titles:
                        recent_activity.append({
                            'id': f"bm-{b['id']}",
                            'action_type': 'BOOKMARK',
                            'action_label': 'Bookmarked Item',
                            'target_type': b['content_type'],
                            'target_id': b['external_id'],
                            'target_title': b['content_title'],
                            'category_name': b['category_name'] or 'Multiverse',
                            'detail': f"Note: {b['note']}" if b['note'] else 'Saved to Personal Vault',
                            'created_at': b['created_at'],
                        })
                for sub in fan_submissions[:3]:
                    if sub['title'] not in seen_titles:
                        recent_activity.append({
                            'id': f"sub-{sub['id']}",
                            'action_type': 'SUBMISSION',
                            'action_label': 'Submitted Fan Work',
                            'target_type': 'ARTICLE',
                            'target_id': str(sub['id']),
                            'target_title': sub['title'],
                            'category_name': sub['category'] or 'Community Vault',
                            'detail': f"Moderation Status: {sub['status']}",
                            'created_at': sub['created_at'],
                        })
                ratings_qs = ContentRating.objects.filter(user=user).select_related('content', 'content__category').order_by('-updated_at')[:5]
                for r in ratings_qs:
                    if r.content.title not in seen_titles:
                        recent_activity.append({
                            'id': f"rate-{r.id}",
                            'action_type': 'RATING',
                            'action_label': 'Rated Content',
                            'target_type': r.content.content_type,
                            'target_id': r.content.slug,
                            'target_title': r.content.title,
                            'category_name': r.content.category.name if r.content.category else 'Multiverse',
                            'detail': f"Rated {r.score} / 5 stars",
                            'created_at': r.updated_at,
                        })
        except Exception:
            recent_activity = []

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
                    'view_count': item.view_count,
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

        fav_names = [cat.name for cat in favorite_categories[:3]]
        fav_summary = ', '.join(fav_names) if fav_names else 'all 8 fandom universes'
        greeting_message = f"Welcome back, {user.username}! Your personalized telemetry for {fav_summary} is synced and live."

        return {
            'greeting': {
                'headline': f"Welcome back, {user.username}!",
                'subheadline': greeting_message,
                'member_since': user.created_at,
            },
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'role': user.role,
                'is_verified': user.is_verified,
                'created_at': user.created_at,
            },
            'profile': {
                'bio': profile.bio if profile else '',
                'avatar': (profile.avatar.url if hasattr(profile.avatar, 'url') else str(profile.avatar)) if profile and profile.avatar else None,
                'theme_preference': profile.theme_preference if profile else 'LIGHT',
                'font_size_preference': profile.font_size_preference if profile else 'NORMAL',
                'dashboard_preferences': profile.dashboard_preferences if profile and profile.dashboard_preferences else {},
                'favorite_categories': [
                    {
                        'id': cat.id,
                        'name': cat.name,
                        'slug': cat.slug,
                        'icon': cat.icon,
                        'accent_color': getattr(cat, 'accent_color', '#38BDF8'),
                        'description': cat.description,
                        'top_pick': cat.top_pick,
                        'entry_count': cat.entry_count,
                    }
                    for cat in favorite_categories
                ],
            },
            'stats': {
                'bookmarks_count': len(bookmarks),
                'notes_count': notes_count,
                'submissions_count': len(fan_submissions),
                'ratings_count': ratings_count,
                'activities_count': len(recent_activity),
            },
            'bookmarks': bookmarks,
            'recent_activity': recent_activity,
            'recent_submissions': fan_submissions,
            'personalized_recommendations': recommendations,
        }


class AdminAnalyticsService:
    """
    Compiles platform-wide analytics, usage monitoring, popular fandom category rankings,
    chatbot interaction volume, and content/merchandise view & popularity metrics.
    """
    @staticmethod
    def get_platform_analytics():
        from fandoms.models import Category, Content, CharacterProfile
        from merchandise.models import MerchandiseItem
        from events.models import Event
        from interactions.models import Bookmark, ContentRating, FanSubmission, Feedback, UserActivity
        from chatbot.models import ChatbotFAQ, ChatbotQuery
        from chatbot.serializers import ChatbotQuerySerializer

        # 1. User & Platform Engagement Overview
        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        verified_users = User.objects.filter(is_verified=True).count()
        admin_users = User.objects.filter(role='ADMIN').count()
        member_users = User.objects.filter(role='MEMBER').count()

        total_content = Content.objects.count()
        published_content = Content.objects.filter(is_published=True).count()
        total_characters = CharacterProfile.objects.count()
        total_events = Event.objects.count()
        total_merch = MerchandiseItem.objects.count()

        total_bookmarks = Bookmark.objects.count()
        total_ratings = ContentRating.objects.count()
        total_submissions = FanSubmission.objects.count()
        pending_submissions = FanSubmission.objects.filter(status='PENDING').count()
        total_feedback = Feedback.objects.count()
        open_feedback = Feedback.objects.exclude(status='RESOLVED').count()
        total_activities = UserActivity.objects.count()

        content_views_sum = Content.objects.aggregate(total=Sum('view_count'))['total'] or 0
        merch_views_sum = MerchandiseItem.objects.aggregate(total=Sum('view_count'))['total'] or 0

        # 2. Popular Fandom Categories Metrics
        categories = Category.objects.all()
        popular_categories = []
        for cat in categories:
            c_contents = Content.objects.filter(category=cat)
            c_content_count = c_contents.count()
            c_views = c_contents.aggregate(total=Sum('view_count'))['total'] or 0
            c_avg_pop = c_contents.aggregate(avg=Avg('popularity_score'))['avg'] or 0.0
            c_merch_views = MerchandiseItem.objects.filter(category=cat).aggregate(total=Sum('view_count'))['total'] or 0
            c_favs = cat.favorited_by_profiles.count()
            c_bookmarks = Bookmark.objects.filter(content__category=cat).count()
            c_subs = FanSubmission.objects.filter(category=cat).count()
            c_chars = CharacterProfile.objects.filter(category=cat).count()

            combined_views = c_views + c_merch_views
            engagement_score = round(
                (combined_views / 1000.0) + (c_favs * 15) + (c_bookmarks * 10) + (c_subs * 12) + (c_avg_pop * 10),
                1
            )

            popular_categories.append({
                'id': cat.id,
                'name': cat.name,
                'slug': cat.slug,
                'icon': cat.icon,
                'accent_color': cat.accent_color,
                'entry_count': cat.entry_count,
                'content_count': c_content_count,
                'character_count': c_chars,
                'favorites_count': c_favs,
                'bookmarks_count': c_bookmarks,
                'submissions_count': c_subs,
                'total_views': combined_views,
                'avg_popularity_score': round(c_avg_pop, 2),
                'engagement_score': engagement_score,
            })

        popular_categories.sort(key=lambda x: (x['engagement_score'], x['total_views']), reverse=True)

        # 3. Chatbot Interaction Volume & Query Statistics
        total_queries = ChatbotQuery.objects.count()
        faq_hits = ChatbotQuery.objects.filter(matched_faq__isnull=False).count()
        hit_rate = round((faq_hits / total_queries * 100), 1) if total_queries > 0 else 0.0
        avg_latency = ChatbotQuery.objects.aggregate(avg=Avg('latency_ms'))['avg'] or 0.0
        active_faqs_count = ChatbotFAQ.objects.filter(is_active=True).count()
        recent_queries = ChatbotQuery.objects.select_related('user', 'matched_faq').order_by('-created_at')[:15]

        # 4. Published Content & Merchandise View Counts and Popularity Scores
        top_content_qs = Content.objects.select_related('category').annotate(
            ratings_total=Count('ratings', distinct=True),
            bookmarks_total=Count('bookmarks', distinct=True)
        ).order_by('-view_count', '-popularity_score')[:20]

        top_content = [
            {
                'id': item.id,
                'title': item.title,
                'slug': item.slug,
                'content_type': item.content_type,
                'category_id': item.category_id,
                'category_name': item.category.name if item.category else 'Uncategorized',
                'category_slug': item.category.slug if item.category else '',
                'accent_color': item.category.accent_color if item.category else '#FACC15',
                'view_count': item.view_count,
                'popularity_score': round(item.popularity_score, 2),
                'ratings_count': item.ratings_total,
                'bookmarks_count': item.bookmarks_total,
                'is_published': item.is_published,
                'artist_or_author': item.artist_or_author,
                'release_year': item.release_year,
            }
            for item in top_content_qs
        ]

        merch_qs = MerchandiseItem.objects.select_related('category').order_by('-view_count', '-created_at')
        merchandise_metrics = [
            {
                'id': m.id,
                'name': m.name,
                'slug': m.slug,
                'category_id': m.category_id,
                'category_name': m.category.name if m.category else 'Multiverse',
                'category_slug': m.category.slug if m.category else '',
                'accent_color': m.category.accent_color if m.category else '#F43F5E',
                'tag': m.tag,
                'tag_display': m.get_tag_display(),
                'is_upcoming': m.is_upcoming,
                'drop_date_text': m.drop_date_text,
                'msrp': m.msrp,
                'manufacturer': m.manufacturer,
                'view_count': m.view_count,
                'popularity_score': round(min(5.0, 3.5 + (m.view_count / 3000.0)), 2),
            }
            for m in merch_qs
        ]

        return {
            'overview': {
                'total_users': total_users,
                'active_users': active_users,
                'verified_users': verified_users,
                'admin_users': admin_users,
                'member_users': member_users,
                'total_content': total_content,
                'published_content': published_content,
                'total_characters': total_characters,
                'total_events': total_events,
                'total_merchandise': total_merch,
                'total_bookmarks': total_bookmarks,
                'total_ratings': total_ratings,
                'total_submissions': total_submissions,
                'pending_submissions': pending_submissions,
                'total_feedback': total_feedback,
                'open_feedback': open_feedback,
                'total_activities': total_activities,
                'total_content_views': content_views_sum,
                'total_merch_views': merch_views_sum,
                'total_platform_views': content_views_sum + merch_views_sum,
                'total_engagement_actions': (
                    total_bookmarks + total_ratings + total_submissions + total_feedback + total_activities + total_queries
                ),
            },
            'popular_categories': popular_categories,
            'chatbot_metrics': {
                'total_queries': total_queries,
                'faq_hits': faq_hits,
                'fallback_queries': max(0, total_queries - faq_hits),
                'faq_hit_rate_pct': hit_rate,
                'avg_latency_ms': round(avg_latency, 2),
                'active_faqs_count': active_faqs_count,
                'recent_queries': ChatbotQuerySerializer(recent_queries, many=True).data,
            },
            'content_metrics': top_content,
            'merchandise_metrics': merchandise_metrics,
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
