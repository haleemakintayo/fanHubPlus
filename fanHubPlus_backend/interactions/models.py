# interactions/models.py

from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _


class Bookmark(models.Model):
    """
    Maps User to Content with an optional personal note.
    """
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
        db_index=True
    )
    note = models.CharField(max_length=500, blank=True, help_text=_('Personal memo or folder tag'))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Bookmark')
        verbose_name_plural = _('Bookmarks')
        unique_together = ('user', 'content')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} bookmarked {self.content}"


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
