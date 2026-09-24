# events/admin.py

from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'city', 'venue_name', 'start_date', 'date_month', 'date_day', 'status')
    list_filter = ('category', 'city', 'date_month', 'year')
    search_fields = ('title', 'city', 'venue_name', 'description')
    prepopulated_fields = {'slug': ('title',)}
