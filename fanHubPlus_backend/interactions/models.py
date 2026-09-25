# interactions/models.py

from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _


class Bookmark(models.Model):
    """
    Maps User to Content or any platform item (articles, character profiles, videos, merchandise)
    with an optional personal note.
    """
    class ItemType(models.TextChoices):
        ARTICLE = 'ARTICLE', _('Article')
        CHARACTER = 'CHARACTER', _('Character Profile')
        VIDEO = 'VIDEO', _('Video / Trailer')
        AUDIO = 'AUDIO', _('Audio Track')
        MERCHANDISE = 'MERCHANDISE', _('Merchandise Item')

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='bookmarks',
        db_index=True
    )
    content = models.ForeignKey(
        'fandoms.Content',
        on_delete=models.CASCADE,
        related_name='bookmarks',
        null=True,
        blank=True,
        db_index=True
    )
    external_id = models.CharField(
        max_length=150,
        blank=True,
        default='',
        db_index=True,
        help_text=_('Optional client or slug identifier for characters, merchandise, or articles')
    )
    item_title = models.CharField(max_length=255, blank=True, default='')
    item_type = models.CharField(
        max_length=30,
        choices=ItemType.choices,
        default=ItemType.ARTICLE,
        db_index=True
    )
    category_name = models.CharField(max_length=100, blank=True, default='')
    thumbnail_url = models.URLField(max_length=1000, blank=True, null=True)
    note = models.CharField(max_length=500, blank=True, help_text=_('Personal memo or folder tag'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Bookmark')
        verbose_name_plural = _('Bookmarks')
        unique_together = ('user', 'content')
        ordering = ['-created_at']

    def __str__(self):
        target = self.content.title if self.content else (self.item_title or self.external_id)
        return f"{self.user} bookmarked {target}"


class ContentRating(models.Model):
    """
    Tracks user feedback using 1-to-5 star ratings or scores.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ratings',
        db_index=True
    )
    content = models.ForeignKey(
        'fandoms.Content',
        on_delete=models.CASCADE,
        related_name='ratings',
        db_index=True
    )
    score = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text=_('Rating score between 1 and 5')
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Content Rating')
        verbose_name_plural = _('Content Ratings')
        unique_together = ('user', 'content')
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.user} rated {self.content}: {self.score} stars"


class FanSubmission(models.Model):
    """
    Holds user-submitted fan articles, lore reviews, or cosplay guides.
    Pending moderator verification before being published into Content catalog.
    """
    class Status(models.TextChoices):
        PENDING = 'PENDING', _('Pending Review')
        APPROVED = 'APPROVED', _('Approved & Published')
        REJECTED = 'REJECTED', _('Rejected')

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='fan_submissions',
        db_index=True
    )
    category = models.ForeignKey(
        'fandoms.Category',
        on_delete=models.CASCADE,
        related_name='fan_submissions',
        db_index=True
    )
    title = models.CharField(max_length=255)
    body = models.TextField(help_text=_('Fan article, review, or lore draft'))
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True
    )
    admin_feedback = models.TextField(blank=True, help_text=_('Moderator feedback or rejection rationale'))
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Fan Submission')
        verbose_name_plural = _('Fan Submissions')
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_status_display()}] {self.title} by {self.user}"


class Feedback(models.Model):
    """
    General bug report, platform suggestion, or inquiry ticket system.
    """
    class FeedbackType(models.TextChoices):
        BUG = 'BUG', _('Bug Report')
        SUGGESTION = 'SUGGESTION', _('Platform Suggestion')
        INQUIRY = 'INQUIRY', _('General Inquiry')

    class Status(models.TextChoices):
        NEW = 'NEW', _('New Ticket')
        IN_REVIEW = 'IN_REVIEW', _('In Review')
        RESOLVED = 'RESOLVED', _('Resolved')

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='feedbacks'
    )
    email = models.EmailField()
    name = models.CharField(max_length=150, blank=True)
    feedback_type = models.CharField(
        max_length=20,
        choices=FeedbackType.choices,
        default=FeedbackType.BUG,
        db_index=True
    )
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Feedback Ticket')
        verbose_name_plural = _('Feedback Tickets')
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_feedback_type_display()}] {self.subject} ({self.email})"


class UserActivity(models.Model):
    """
    Tracks and displays the user's recent interactions and browsing activity on the platform.
    """
    class ActionType(models.TextChoices):
        VIEW = 'VIEW', _('Viewed Item')
        BOOKMARK = 'BOOKMARK', _('Bookmarked Item')
        NOTE = 'NOTE', _('Updated Bookmark Note')
        RATING = 'RATING', _('Rated Content')
        SUBMISSION = 'SUBMISSION', _('Submitted Fan Work')
        CHATBOT = 'CHATBOT', _('Queried FandomBot AI')
        FILTER = 'FILTER', _('Explored Fandom Category')
        PROFILE = 'PROFILE', _('Updated Profile Preferences')

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='activities',
        db_index=True
    )
    action_type = models.CharField(
        max_length=30,
        choices=ActionType.choices,
        default=ActionType.VIEW,
        db_index=True
    )
    target_type = models.CharField(max_length=50, blank=True, default='Content')
    target_id = models.CharField(max_length=150, blank=True, default='')
    target_title = models.CharField(max_length=255)
    category_name = models.CharField(max_length=100, blank=True, default='')
    detail = models.CharField(max_length=500, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = _('User Activity')
        verbose_name_plural = _('User Activities')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.action_type}: {self.target_title}"

