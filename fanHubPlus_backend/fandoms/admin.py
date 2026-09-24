# fandoms/admin.py

from django.contrib import admin
from .models import Category, Content, CharacterProfile


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon', 'accent_color', 'entry_count', 'created_at')
    search_fields = ('name', 'slug', 'description')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'content_type', 'popularity_score', 'view_count', 'is_published', 'created_at')
    list_filter = ('category', 'content_type', 'is_published')
    search_fields = ('title', 'synopsis', 'body_text', 'artist_or_author')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('popularity_score', 'is_published')


@admin.register(CharacterProfile)
class CharacterProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'alias', 'category', 'archetype', 'faction', 'created_at')
    list_filter = ('category', 'archetype')
    search_fields = ('name', 'alias', 'origin', 'faction', 'biography')
    prepopulated_fields = {'slug': ('name',)}
