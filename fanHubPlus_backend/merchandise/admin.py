# merchandise/admin.py

from django.contrib import admin
from .models import MerchandiseItem


@admin.register(MerchandiseItem)
class MerchandiseItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'tag', 'is_upcoming', 'msrp', 'view_count', 'popularity_score', 'created_at')
    list_filter = ('category', 'tag', 'is_upcoming')
    search_fields = ('name', 'manufacturer', 'description')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_upcoming', 'tag', 'popularity_score')
