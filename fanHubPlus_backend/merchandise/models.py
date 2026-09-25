# merchandise/models.py

from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class MerchandiseItem(models.Model):
    """
    Represents collectibles, figurines, and vinyl records for display purposes.
    Zero checkout, pricing, or billing fields per SRS Section 1.5.
    """
    class Tag(models.TextChoices):
        LIMITED_EDITION = 'LIMITED_EDITION', _('Limited Edition')
        PRE_ORDER = 'PRE_ORDER', _('Pre-Order Soon')
        COLLECTIBLE = 'COLLECTIBLE', _('Collectible')
        OFFICIAL_LICENSED = 'OFFICIAL_LICENSED', _('Official Licensed')

    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.ForeignKey(
        'fandoms.Category',
        on_delete=models.CASCADE,
        related_name='merchandise_items',
        db_index=True
    )
    image_url = models.URLField(max_length=1000, blank=True)
    tag = models.CharField(
        max_length=30,
        choices=Tag.choices,
        default=Tag.LIMITED_EDITION,
        db_index=True
    )
    is_upcoming = models.BooleanField(default=False, db_index=True)
    drop_date = models.DateTimeField(null=True, blank=True)
    drop_date_text = models.CharField(max_length=150, blank=True, help_text=_('Display text e.g. Oct 15, 2026 • 12:00 PM EST'))
    msrp = models.CharField(max_length=100, blank=True, help_text=_('Display MSRP preview only'))
    manufacturer = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    view_count = models.PositiveIntegerField(default=0, db_index=True)
    popularity_score = models.FloatField(default=0.0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Merchandise Item')
        verbose_name_plural = _('Merchandise Items')
        ordering = ['-view_count', '-created_at']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
