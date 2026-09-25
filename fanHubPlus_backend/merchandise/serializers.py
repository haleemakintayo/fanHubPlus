# merchandise/serializers.py

from rest_framework import serializers
from django.utils.text import slugify
from .models import MerchandiseItem
from fandoms.models import Category
from fandoms.serializers import CategorySerializer, resolve_category_from_attrs


class MerchandiseItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    category_slug = serializers.CharField(write_only=True, required=False)
    slug = serializers.SlugField(required=False, allow_blank=True)
    tag_display = serializers.CharField(source='get_tag_display', read_only=True)

    class Meta:
        model = MerchandiseItem
        fields = [
            'id',
            'name',
            'slug',
            'category',
            'category_id',
            'category_slug',
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

    def validate(self, attrs):
        attrs = resolve_category_from_attrs(attrs)
        if not self.instance and not attrs.get('category'):
            default_cat = Category.objects.first()
            if default_cat:
                attrs['category'] = default_cat
        if not self.instance and not attrs.get('slug') and attrs.get('name'):
            base_slug = slugify(attrs['name']) or 'merch-item'
            unique_slug = base_slug
            counter = 1
            while MerchandiseItem.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            attrs['slug'] = unique_slug
        return attrs
