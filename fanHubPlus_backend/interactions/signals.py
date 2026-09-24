# interactions/signals.py

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Bookmark, ContentRating
from .services import ScoreSignalHandler


@receiver(post_save, sender=ContentRating)
def rating_saved_handler(sender, instance, created, **kwargs):
    ScoreSignalHandler.on_interaction_changed(instance.content)


@receiver(post_delete, sender=ContentRating)
def rating_deleted_handler(sender, instance, **kwargs):
    ScoreSignalHandler.on_interaction_changed(instance.content)


@receiver(post_save, sender=Bookmark)
def bookmark_saved_handler(sender, instance, created, **kwargs):
    ScoreSignalHandler.on_interaction_changed(instance.content)


@receiver(post_delete, sender=Bookmark)
def bookmark_deleted_handler(sender, instance, **kwargs):
    ScoreSignalHandler.on_interaction_changed(instance.content)
