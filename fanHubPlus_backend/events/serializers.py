# events/serializers.py

from rest_framework import serializers
from .models import Event
from fandoms.serializers import CategorySerializer


class EventSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'slug',
            'category',
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
