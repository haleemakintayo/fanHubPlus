# merchandise/serializers.py

from rest_framework import serializers
from .models import MerchandiseItem
from fandoms.serializers import CategorySerializer


class MerchandiseItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tag_display = serializers.CharField(source='get_tag_display', read_only=True)

    class Meta:
        model = MerchandiseItem
        fields = [
            'id',
            'name',
            'slug',
            'category',
            'image_url',
            'tag',
            'tag_display',
            'is_upcoming',
            'drop_date',
            'drop_date_text',
            'msrp',
            'manufacturer',
            'description',
            'view_count',
            'created_at',
        ]
