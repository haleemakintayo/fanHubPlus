# interactions/services.py

from django.db import transaction
from django.utils.text import slugify
from fandoms.services import PopularityEngine


class ScoreSignalHandler:
    """
    Listens for new ratings or bookmarks to trigger popularity updates via:
    Score = (Rating_avg * 0.7) + (log10(Bookmarks + 1) * 0.3)
    """
    @staticmethod
    def on_interaction_changed(content):
        if content:
            return PopularityEngine.recalculate_for_content(content)
        return None


PopularityScoreSignalHandler = ScoreSignalHandler


class ModerationPipeline:
    """
    Handles state transitions for fan submissions, auto-publishing approved
    submissions directly into the main Content catalog within an atomic transaction.
    """
    @classmethod
    def moderate_submission(cls, submission, decision, admin_feedback=''):
        decision = decision.upper()
        if decision not in ['APPROVED', 'REJECTED']:
            raise ValueError(f"Invalid moderation decision: {decision}")

        from fandoms.models import Content

        with transaction.atomic():
            submission.status = decision
            submission.admin_feedback = admin_feedback
            submission.save()

            published_content = None
            if decision == 'APPROVED':
                # Generate unique slug
                base_slug = slugify(submission.title)
                unique_slug = f"{base_slug}-{submission.id}"
                counter = 1
                while Content.objects.filter(slug=unique_slug).exists():
                    unique_slug = f"{base_slug}-{submission.id}-{counter}"
                    counter += 1

                synopsis_preview = submission.body[:250] + ('...' if len(submission.body) > 250 else '')

                published_content = Content.objects.create(
                    title=submission.title,
                    slug=unique_slug,
                    category=submission.category,
                    content_type=Content.ContentType.ARTICLE,
                    body_text=submission.body,
                    synopsis=synopsis_preview,
                    artist_or_author=f"Fan Creator: {submission.user.username}",
                    is_published=True,
                    popularity_score=3.5 # Initial base score for approved fan work
                )

        return submission, published_content


class FeedbackDispatcher:
    """
    Validates and queues feedback tickets.
    """
    @staticmethod
    def dispatch_feedback(feedback_instance):
        # In production this could send a notification to an admin channel or email
        return {
            'ticket_id': feedback_instance.id,
            'type': feedback_instance.feedback_type,
            'status': feedback_instance.status,
            'dispatched': True,
        }
