
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager['User']):
    """
    Custom user manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email).strip().lower()
        extra_fields.setdefault('role', User.Role.MEMBER)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.ADMIN)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """
    Custom User entity extending Django's AbstractUser to include email as the primary login field.
    Supports email-based login and three functional platform roles.
    """
    class Role(models.TextChoices):
        VISITOR = 'VISITOR', _('Visitor')
        MEMBER = 'MEMBER', _('Registered User')
        ADMIN = 'ADMIN', _('Administrator')

    username = models.CharField(
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.')
    )
    email = models.EmailField(
        _('email address'),
        unique=True,
        error_messages={
            'unique': _('A user with that email already exists.'),
        }
    )
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.MEMBER,
        db_index=True,
        help_text=_('Role assigned to the user defining system permissions.')
    )
    is_verified = models.BooleanField(
        default=False,
        help_text=_('Designates whether this user has verified their email address via token link.')
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects: CustomUserManager = CustomUserManager()

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN or self.is_superuser


class Profile(models.Model):
    """
    Extended user profile for customized dashboards and personalization.
    Stores fandom preferences, accessibility preferences, and avatar assets.
    """
    class ThemePreference(models.TextChoices):
        LIGHT = 'LIGHT', _('Light Mode (Pop-Brutalist)')
        DARK = 'DARK', _('Dark Mode (Cyber-Brutalist)')
        SYSTEM = 'SYSTEM', _('System Default')

    class FontSizePreference(models.TextChoices):
        NORMAL = 'NORMAL', _('Default (16px)')
        LARGE = 'LARGE', _('Large (18px Accessibility)')

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    avatar = models.CharField(
        max_length=1000,
        null=True,
        blank=True,
        help_text=_('Optional user avatar URL or asset path.')
    )
    bio = models.TextField(
        max_length=500,
        blank=True,
        help_text=_('Short bio or fan manifesto.')
    )
    favorite_categories = models.ManyToManyField(
        'fandoms.Category',
        related_name='favorited_by_profiles',
        blank=True,
        help_text=_('Fandom categories the user selects for their personalized dashboard.')
    )
    theme_preference = models.CharField(
        max_length=10,
        choices=ThemePreference.choices,
        default=ThemePreference.LIGHT,
        help_text=_('UI theme preference for accessibility.')
    )
    font_size_preference = models.CharField(
        max_length=10,
        choices=FontSizePreference.choices,
        default=FontSizePreference.NORMAL,
        help_text=_('Font scaling setting for visual comfort.')
    )
    dashboard_preferences = models.JSONField(
        default=dict,
        blank=True,
        help_text=_('User dashboard customization settings (layout density, visible widgets, default filters).')
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')

    def __str__(self):
        return f"Profile of {self.user.username}"


# Signal to instantiate Profile automatically upon User creation
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)