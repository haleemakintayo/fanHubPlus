# fandoms/models.py

from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """
    Mandatory fandom groups (Anime, Gaming, Movies & TV, K-Pop, Comics, Manga, Cosplay, Community Vault)
    with URL-safe slugs, descriptions, icons, and theme accents.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='Tv', help_text=_('Icon identifier (e.g. Tv, Gamepad2, Film, Mic2)'))
    accent_color = models.CharField(max_length=20, default='#38BDF8', help_text=_('Hex color code for branding'))
    badge_text_color = models.CharField(max_length=20, default='text-black')
    entry_count = models.CharField(max_length=50, blank=True, default='0+ Entries')
    tags = models.JSONField(default=list, blank=True)
    top_pick = models.CharField(max_length=255, blank=True)
    featured_quote = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Content(models.Model):
    """
    Core polymorphic media entity storing curated articles, video trailers, audio soundtracks, and image sets.
    """
    class ContentType(models.TextChoices):
        ARTICLE = 'ARTICLE', _('Article')
        VIDEO = 'VIDEO', _('Video Trailer')
        AUDIO = 'AUDIO', _('Audio Soundtrack')
        IMAGE = 'IMAGE', _('Image Set')

    title = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='contents',
        db_index=True
    )
    content_type = models.CharField(
        max_length=20,
        choices=ContentType.choices,
        default=ContentType.ARTICLE,
        db_index=True
    )
    media_url = models.URLField(max_length=1000, blank=True, null=True, help_text=_('Embed or streaming URL'))
    thumbnail_url = models.URLField(max_length=1000, blank=True, null=True)
    body_text = models.TextField(blank=True, help_text=_('Rich text / markdown article body'))
    synopsis = models.TextField(blank=True, help_text=_('Short blurb or synopsis'))
    artist_or_author = models.CharField(max_length=255, blank=True)
    duration = models.CharField(max_length=50, blank=True, help_text=_('Formatted duration e.g. 02:45'))
    duration_seconds = models.PositiveIntegerField(default=0)
    release_date = models.DateField(null=True, blank=True)
    release_year = models.CharField(max_length=100, blank=True, help_text=_('e.g. 2026 Remaster'))
    popularity_score = models.FloatField(default=0.0, db_index=True)
    view_count = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Content')
        verbose_name_plural = _('Contents')
        ordering = ['-popularity_score', '-created_at']

    def __str__(self):
        return f"[{self.get_content_type_display()}] {self.title}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class CharacterProfile(models.Model):
    """
    Stores structured character lore, origin category, biography, image URL,
    and a stats_json column for custom power/affiliation attributes.
    """
    name = models.CharField(max_length=150, db_index=True)
    slug = models.SlugField(max_length=150, unique=True, db_index=True)
    alias = models.CharField(max_length=150, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='characters',
        db_index=True
    )
    archetype = models.CharField(max_length=100, blank=True)
    origin = models.CharField(max_length=200, blank=True)
    faction = models.CharField(max_length=200, blank=True)
    tagline = models.TextField(blank=True)
    biography = models.TextField(blank=True)
    image_url = models.URLField(max_length=1000, blank=True)
    stats_json = models.JSONField(default=list, blank=True, help_text=_('Array of attribute dicts'))
    details_json = models.JSONField(default=dict, blank=True, help_text=_('Dict of lore metadata'))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Character Profile')
        verbose_name_plural = _('Character Profiles')
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.alias})" if self.alias else self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class CharacterSubmission(models.Model):
    """User-proposed character profile changes awaiting administrator review."""
    class Status(models.TextChoices):
        PENDING = 'PENDING', _('Pending Review')
        APPROVED = 'APPROVED', _('Approved & Published')
        REJECTED = 'REJECTED', _('Rejected')

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='character_submissions',
        db_index=True
    )
    existing_character = models.ForeignKey(
        CharacterProfile,
        on_delete=models.SET_NULL,
        related_name='submissions',
        null=True,
        blank=True
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='character_submissions')
    name = models.CharField(max_length=150)
    alias = models.CharField(max_length=150, blank=True)
    archetype = models.CharField(max_length=100, blank=True)
    origin = models.CharField(max_length=200, blank=True)
    faction = models.CharField(max_length=200, blank=True)
    tagline = models.TextField(blank=True)
    biography = models.TextField(blank=True)
    image_url = models.URLField(max_length=1000, blank=True)
    stats_json = models.JSONField(default=list, blank=True)
    details_json = models.JSONField(default=dict, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True)
    admin_feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_status_display()}] {self.name} by {self.user}"


class StreamMedia(models.Model):
    """
    Dedicated model for the 'Stream & Discover' Audiovisual Vault:
    stores 4K video trailers and lossless audio soundtrack streams.
    """
    class StreamType(models.TextChoices):
        TRAILER = 'TRAILER', _('Video Trailer')
        AUDIO = 'AUDIO', _('Audio Soundtrack')

    title = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='stream_media',
        db_index=True
    )
    stream_type = models.CharField(
        max_length=20,
        choices=StreamType.choices,
        default=StreamType.TRAILER,
        db_index=True
    )
    universe_label = models.CharField(
        max_length=100,
        blank=True,
        help_text=_('Display universe/category label e.g. Anime / Gaming')
    )
    accent_color = models.CharField(max_length=20, default='#A3E635')
    media_url = models.URLField(
        max_length=1000,
        help_text=_('YouTube link (e.g. https://youtu.be/x4ztgjvfU60) or audio stream URL')
    )
    thumbnail_url = models.URLField(max_length=1000, blank=True)
    synopsis = models.TextField(blank=True)
    artist = models.CharField(max_length=255, blank=True)
    album = models.CharField(max_length=255, blank=True)
    duration = models.CharField(max_length=20, default='02:45')
    duration_seconds = models.PositiveIntegerField(default=165)
    release_year = models.CharField(max_length=100, blank=True)
    rating = models.FloatField(default=4.9)
    ratings_count = models.PositiveIntegerField(default=100)
    views_label = models.CharField(max_length=50, default='1.0M views')
    view_count = models.PositiveIntegerField(default=0)
    likes_label = models.CharField(max_length=50, default='10.0k')
    likes_count = models.PositiveIntegerField(default=0)
    display_order = models.PositiveIntegerField(default=0, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Stream & Discover Media')
        verbose_name_plural = _('Stream & Discover Media')
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return f"[{self.get_stream_type_display()}] {self.title}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.universe_label and self.category_id:
            self.universe_label = self.category.name
        super().save(*args, **kwargs)

    @property
    def youtube_video_id(self) -> str:
        """Extracts YouTube video ID from youtu.be/<id>, youtube.com/watch?v=<id>, or youtube.com/embed/<id>."""
        url = (self.media_url or '').strip()
        if not url:
            return ''
        if 'youtu.be/' in url:
            after = url.split('youtu.be/', 1)[1]
            return after.split('?')[0].split('&')[0].split('/')[0]
        if 'v=' in url:
            after = url.split('v=', 1)[1]
            return after.split('&')[0].split('#')[0]
        if '/embed/' in url:
            after = url.split('/embed/', 1)[1]
            return after.split('?')[0].split('&')[0].split('/')[0]
        return ''

    @property
    def embed_url(self) -> str:
        vid = self.youtube_video_id
        if vid:
            return f"https://www.youtube.com/embed/{vid}"
        return self.media_url or ''

