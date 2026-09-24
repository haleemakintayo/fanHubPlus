# accounts/tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from fandoms.models import Category
from .services import PasswordResetService

User = get_user_model()


class AccountsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.anime_cat = Category.objects.create(name='Anime', slug='anime', icon='Tv')
        self.gaming_cat = Category.objects.create(name='Gaming', slug='gaming', icon='Gamepad2')

    def test_user_registration_flow(self):
        url = '/api/accounts/register/'
        payload = {
            'email': 'newfan@fanhub.com',
            'username': 'newfan',
            'password': 'SecurePassword123!',
            'password_confirm': 'SecurePassword123!',
            'favorite_categories': ['anime', 'gaming']
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])

        user = User.objects.get(email='newfan@fanhub.com')
        self.assertEqual(user.username, 'newfan')
        self.assertEqual(user.role, User.Role.MEMBER)
        self.assertEqual(user.profile.favorite_categories.count(), 2)

    def test_user_login_flow(self):
        User.objects.create_user(
            email='loginfan@fanhub.com',
            username='loginfan',
            password='SecurePassword123!'
        )
        url = '/api/accounts/login/'
        response = self.client.post(url, {
            'email': 'loginfan@fanhub.com',
            'password': 'SecurePassword123!'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])

    def test_user_dashboard_hydration(self):
        user = User.objects.create_user(
            email='dashfan@fanhub.com',
            username='dashfan',
            password='SecurePassword123!'
        )
        user.profile.favorite_categories.add(self.anime_cat)

        self.client.force_authenticate(user=user)
        response = self.client.get('/api/accounts/dashboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['email'], 'dashfan@fanhub.com')
        self.assertIn('bookmarks', response.data)
        self.assertIn('personalized_recommendations', response.data)
        self.assertEqual(len(response.data['profile']['favorite_categories']), 1)

    def test_profile_update(self):
        user = User.objects.create_user(
            email='updatefan@fanhub.com',
            username='updatefan',
            password='SecurePassword123!'
        )
        self.client.force_authenticate(user=user)
        response = self.client.patch('/api/accounts/profile/', {
            'bio': 'Ultimate Otaku & Lore Explorer',
            'theme_preference': 'DARK',
            'font_size_preference': 'LARGE',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.profile.refresh_from_db()
        self.assertEqual(user.profile.bio, 'Ultimate Otaku & Lore Explorer')
        self.assertEqual(user.profile.theme_preference, 'DARK')
        self.assertEqual(user.profile.font_size_preference, 'LARGE')

    def test_password_reset_service(self):
        user = User.objects.create_user(
            email='resetfan@fanhub.com',
            username='resetfan',
            password='OldPassword123!'
        )
        token_data = PasswordResetService.generate_reset_token(user)
        self.assertIn('uid', token_data)
        self.assertIn('token', token_data)

        success, msg = PasswordResetService.validate_and_reset(
            token_data['uid'],
            token_data['token'],
            'NewPassword123!'
        )
        self.assertTrue(success)
        user.refresh_from_db()
        self.assertTrue(user.check_password('NewPassword123!'))
