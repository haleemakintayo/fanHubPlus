# merchandise/services.py

from django.db.models import F
from django.utils import timezone
from .models import MerchandiseItem


class ViewCounterService:
    """
    Handles atomic database increments using F('view_count') + 1
    to prevent race conditions during high-concurrency traffic.
    """
    @staticmethod
    def _refresh_popularity(item):
        import math
        item.popularity_score = round(min(5.0, 3.5 + math.log10(item.view_count + 1) * 0.45), 2)
        item.save(update_fields=['popularity_score'])
        return item.popularity_score

    @staticmethod
    def increment_view_count(merchandise_id):
        updated = MerchandiseItem.objects.filter(pk=merchandise_id).update(
            view_count=F('view_count') + 1
        )
        if updated:
            item = MerchandiseItem.objects.get(pk=merchandise_id)
            ViewCounterService._refresh_popularity(item)
            return item.view_count
        return None

    @staticmethod
    def increment_by_slug(slug):
        updated = MerchandiseItem.objects.filter(slug=slug).update(
            view_count=F('view_count') + 1
        )
        if updated:
            item = MerchandiseItem.objects.get(slug=slug)
            ViewCounterService._refresh_popularity(item)
            return item.view_count
        return None


class DropRadarScheduler:
    """
    Queries, filters, and organizes upcoming showcase drops across categories.
    """
    @staticmethod
    def get_upcoming_drops(category_slug=None, tag=None):
        qs = MerchandiseItem.objects.filter(is_upcoming=True).select_related('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        if tag:
            qs = qs.filter(tag__iexact=tag)
        return qs.order_by('drop_date', '-view_count')
