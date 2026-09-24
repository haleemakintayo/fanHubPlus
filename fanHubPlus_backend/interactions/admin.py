# interactions/admin.py

from django.contrib import admin
from .models import Bookmark, ContentRating, FanSubmission, Feedback


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'note', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'user__email', 'content__title', 'note')


@admin.register(ContentRating)
class ContentRatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'score', 'created_at', 'updated_at')
    list_filter = ('score', 'created_at')
    search_fields = ('user__username', 'user__email', 'content__title')


@admin.register(FanSubmission)
class FanSubmissionAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'status', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'body', 'user__username', 'admin_feedback')
    list_editable = ('status',)


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('subject', 'feedback_type', 'email', 'status', 'created_at')
    list_filter = ('feedback_type', 'status', 'created_at')
    search_fields = ('subject', 'message', 'email', 'name')
    list_editable = ('status',)
