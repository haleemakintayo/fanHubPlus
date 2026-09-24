# events/models.py

from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Event(models.Model):
    """
    Tracks conventions, cosplay meetups, and anime/film screenings.
    Includes geolocation coordinates for interactive radar and Haversine mapping.
    """
    title = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.ForeignKey(
        'fandoms.Category',
        on_delete=models.CASCADE,
        related_name='events',
        db_index=True
    )
    event_type = models.CharField(max_length=100, default='Convention')
    city = models.CharField(max_length=150, db_index=True)
    venue_name = models.CharField(max_length=255)
    start_date = models.DateField(db_index=True)
    end_date = models.DateField(null=True, blank=True)
    date_month = models.CharField(max_length=10, blank=True, help_text=_('e.g. AUG, OCT, NOV'))
    date_day = models.CharField(max_length=20, blank=True, help_text=_('e.g. 14-16'))
    year = models.CharField(max_length=10, default='2026')
    latitude = models.FloatField(db_index=True)
    longitude = models.FloatField(db_index=True)
    map_x = models.FloatField(default=50.0, blank=True, help_text=_('Percentage X on visual stylized radar map'))
    map_y = models.FloatField(default=50.0, blank=True, help_text=_('Percentage Y on visual stylized radar map'))
    ticket_url = models.URLField(max_length=1000, blank=True, null=True)
    attendees_info = models.CharField(max_length=150, blank=True, default='50,000+ Expected')
    status = models.CharField(max_length=100, default='Registration Open')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Event')
        verbose_name_plural = _('Events')
        ordering = ['start_date']

    def __str__(self):
        return f"{self.title} ({self.city})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
