# events/serializers.py

from rest_framework import serializers
from django.utils.text import slugify
from .models import Event
from fandoms.models import Category
from fandoms.serializers import CategorySerializer, resolve_category_from_attrs


class EventSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    category_slug = serializers.CharField(write_only=True, required=False)
    slug = serializers.SlugField(required=False, allow_blank=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'category_id',
            'category_slug',
            'event_type',
            'city',
            'venue_name',
            'start_date',
            'end_date',
            'date_month',
            'date_day',
            'year',
            'latitude',
            'longitude',
            'map_x',
            'map_y',
            'ticket_url',
            'attendees_info',
            'status',
            'description',
            'created_at',
        ]

    def validate(self, attrs):
        attrs = resolve_category_from_attrs(attrs)
        if not self.instance and not attrs.get('category'):
            default_cat = Category.objects.first()
            if default_cat:
                attrs['category'] = default_cat
        if not self.instance and not attrs.get('slug') and attrs.get('title'):
            base_slug = slugify(attrs['title']) or 'event'
            unique_slug = base_slug
            counter = 1
            while Event.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            attrs['slug'] = unique_slug
        return attrs
