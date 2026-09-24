# accounts/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from .models import Profile
from fandoms.models import Category

User = get_user_model()


class CategorySimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'accent_color']


class ProfileSerializer(serializers.ModelSerializer):
    favorite_categories = CategorySimpleSerializer(many=True, read_only=True)
    favorite_category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        write_only=True,
        source='favorite_categories',
        required=False
    )

    class Meta:
        model = Profile
        fields = [
            'id',
            'avatar',
            'bio',
            'theme_preference',
            'font_size_preference',
            'favorite_categories',
            'favorite_category_ids',
            'updated_at',
        ]
        read_only_fields = ['id', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'role',
            'is_verified',
            'profile',
            'created_at',
        ]
        read_only_fields = ['id', 'role', 'is_verified', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    favorite_categories = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'password_confirm',
            'favorite_categories',
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        favorite_categories_raw = validated_data.pop('favorite_categories', [])
        validated_data.pop('password_confirm')

        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            role=User.Role.MEMBER
        )

        # Attach favorite categories to the profile if provided
        if favorite_categories_raw:
            profile, _ = Profile.objects.get_or_create(user=user)
            # Find categories by id or slug or name
            for cat_identifier in favorite_categories_raw:
                cat = None
                if str(cat_identifier).isdigit():
                    cat = Category.objects.filter(pk=int(cat_identifier)).first()
                if not cat:
                    cat = Category.objects.filter(slug=str(cat_identifier)).first()
                if not cat:
                    cat = Category.objects.filter(name__iexact=str(cat_identifier)).first()
                if cat:
                    profile.favorite_categories.add(cat)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError("Must include both email and password.")

        # Email based authentication
        user = authenticate(request=self.context.get('request'), email=email, password=password)
        if not user:
            # Fallback check if user exists
            try:
                found_user = User.objects.get(email=email)
                if not found_user.check_password(password):
                    raise serializers.ValidationError("Invalid email or password.")
                user = found_user
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid email or password.")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        attrs['user'] = user
        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
