# interactions/tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from fandoms.models import Category, Content
from .models import Bookmark, ContentRating, FanSubmission, Feedback
from .services import ModerationPipeline

User = get_user_model()


class InteractionsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='member@fanhub.com',
            username='member_fan',
            password='TestPassword123!',
            role=User.Role.MEMBER
        )
        self.admin = User.objects.create_superuser(
            email='admin@fanhub.com',
            username='admin_fan',
            password='AdminPassword123!'
        )
        self.category = Category.objects.create(name='Anime', slug='anime', icon='Tv')
        self.content = Content.objects.create(
            title='Attack on Titan Finale',
            slug='aot-finale',
            category=self.category,
            content_type=Content.ContentType.VIDEO,
            popularity_score=0.0
        )

    def test_bookmark_toggle_flow(self):
        self.client.force_authenticate(user=self.user)
        url = '/api/interactions/bookmarks/toggle/'

        # 1. Create bookmark
        res1 = self.client.post(url, {'content_id': self.content.id, 'note': 'Rewatch list'}, format='json')
        self.assertEqual(res1.status_code, status.HTTP_201_CREATED)
        self.assertTrue(res1.data['bookmarked'])
        self.assertTrue(Bookmark.objects.filter(user=self.user, content=self.content).exists())

        # 2. Toggle again to delete bookmark
        res2 = self.client.post(url, {'content_id': self.content.id}, format='json')
        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        self.assertFalse(res2.data['bookmarked'])
        self.assertFalse(Bookmark.objects.filter(user=self.user, content=self.content).exists())

    def test_rating_submission_and_score_recalculation(self):
        self.client.force_authenticate(user=self.user)
        url = '/api/interactions/ratings/'

        response = self.client.post(url, {'content_id': self.content.id, 'score': 5}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_score'], 5)
        self.assertEqual(response.data['average_rating'], 5.0)

        self.content.refresh_from_db()
        # Formula: (5.0 * 0.7) + (log10(0 + 1) * 0.3) = 3.5
        self.assertAlmostEqual(self.content.popularity_score, 3.5, places=2)

        # Now add a bookmark and verify formula increases score:
        Bookmark.objects.create(user=self.user, content=self.content)
        self.content.refresh_from_db()
        # Bookmark count = 1 -> log10(2) ~ 0.30103 -> 3.5 + 0.30103 * 0.3 = 3.59
        self.assertGreater(self.content.popularity_score, 3.5)

    def test_fan_submission_and_moderation_pipeline(self):
        # 1. Member creates draft
        self.client.force_authenticate(user=self.user)
        sub_res = self.client.post('/api/interactions/submissions/', {
            'category_id': self.category.id,
            'title': 'Why Levi Ackerman is the Greatest Vanguard',
            'body': 'A detailed tactical retrospective of the Beast Titan confrontation in Shiganshina.'
        }, format='json')
        self.assertEqual(sub_res.status_code, status.HTTP_201_CREATED)
        sub_id = sub_res.data['id']
        self.assertEqual(sub_res.data['status'], 'PENDING')

        # 2. Admin inspects and approves draft
        self.client.force_authenticate(user=self.admin)
        mod_url = f'/api/interactions/moderation/{sub_id}/'
        mod_res = self.client.patch(mod_url, {
            'status': 'APPROVED',
            'admin_feedback': 'Outstanding tactical breakdown. Promoted to Multiverse catalog.'
        }, format='json')
        self.assertEqual(mod_res.status_code, status.HTTP_200_OK)
        self.assertEqual(mod_res.data['status'], 'APPROVED')
        self.assertIn('published_content_id', mod_res.data)

        # 3. Verify content is now in the Content table and visible
        published_content = Content.objects.get(pk=mod_res.data['published_content_id'])
        self.assertEqual(published_content.title, 'Why Levi Ackerman is the Greatest Vanguard')
        self.assertEqual(published_content.category, self.category)
        self.assertTrue(published_content.is_published)

    def test_feedback_submission(self):
        response = self.client.post('/api/interactions/feedback/', {
            'email': 'visitor@example.com',
            'name': 'Visitor Fan',
            'feedback_type': 'BUG',
            'subject': 'Soundtrack audio player glitch on mobile',
            'message': 'The waveform visualizer clipped on 375px screens.'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Feedback.objects.filter(subject__icontains='Soundtrack').exists())
