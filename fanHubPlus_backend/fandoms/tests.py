# fandoms/tests.py

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Category, Content, CharacterProfile

User = get_user_model()


class FandomsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.anime = Category.objects.create(name='Anime', slug='anime', icon='Tv', accent_color='#A3E635')
        self.gaming = Category.objects.create(name='Gaming', slug='gaming', icon='Gamepad2', accent_color='#FACC15')

        self.c1 = Content.objects.create(
            title='Attack on Titan Finale',
            slug='aot-finale',
            category=self.anime,
            content_type=Content.ContentType.VIDEO,
            synopsis='The epic conclusion to the rumbling.',
            popularity_score=4.9,
            view_count=100
        )
        self.c2 = Content.objects.create(
            title='Elden Ring Shadow Lore',
            slug='elden-ring-shadow',
            category=self.gaming,
            content_type=Content.ContentType.ARTICLE,
            synopsis='A deep dive into Miquella and the Land of Shadow.',
            popularity_score=4.5,
            view_count=50
        )
        self.char1 = CharacterProfile.objects.create(
            name='Ryuto Kazama',
            slug='ryuto-kazama',
            alias='Titan Slayer',
            category=self.anime,
            archetype='Anime Protagonist',
            origin='District 7',
            faction='Survey Scout',
            stats_json=[{'label': 'Agility', 'value': 94}]
        )

    def test_category_list(self):
        response = self.client.get('/api/fandoms/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_content_explorer_filtering_and_sorting(self):
        # Filter by category
        res1 = self.client.get('/api/fandoms/content/?category=anime')
        self.assertEqual(res1.status_code, status.HTTP_200_OK)
        results = res1.data['results'] if 'results' in res1.data else res1.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['slug'], 'aot-finale')

        # Filter by content_type
        res2 = self.client.get('/api/fandoms/content/?content_type=ARTICLE')
        results2 = res2.data['results'] if 'results' in res2.data else res2.data
        self.assertEqual(len(results2), 1)
        self.assertEqual(results2[0]['slug'], 'elden-ring-shadow')

        # Search query
        res3 = self.client.get('/api/fandoms/content/?search=Miquella')
        results3 = res3.data['results'] if 'results' in res3.data else res3.data
        self.assertEqual(len(results3), 1)
        self.assertEqual(results3[0]['slug'], 'elden-ring-shadow')

        # Sorting
        res4 = self.client.get('/api/fandoms/content/?sort=popular')
        results4 = res4.data['results'] if 'results' in res4.data else res4.data
        self.assertEqual(results4[0]['slug'], 'aot-finale')

    def test_content_detail_and_view_count_increment(self):
        initial_views = self.c1.view_count
        response = self.client.get(f'/api/fandoms/content/{self.c1.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.c1.refresh_from_db()
        self.assertEqual(self.c1.view_count, initial_views + 1)

    def test_character_roster(self):
        response = self.client.get('/api/fandoms/characters/?category=anime')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], 'Ryuto Kazama')
        self.assertEqual(results[0]['stats_json'][0]['label'], 'Agility')

    def test_member_character_submission_requires_admin_approval(self):
        member = User.objects.create_user(email='fan@example.com', username='fan', password='SecurePassword123!')
        admin = User.objects.create_superuser(email='admin@example.com', username='admin', password='SecurePassword123!')

        self.client.force_authenticate(user=member)
        response = self.client.post('/api/fandoms/character-submissions/', {
            'name': 'New Hero',
            'category_id': self.anime.id,
            'biography': 'A community-submitted biography.',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        submission_id = response.data['id']
        self.assertEqual(response.data['status'], 'PENDING')
        self.assertFalse(CharacterProfile.objects.filter(name='New Hero').exists())

        self.client.force_authenticate(user=admin)
        queue_response = self.client.get('/api/fandoms/character-submissions/manage/?status=PENDING')
        self.assertEqual(queue_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(queue_response.data), 1)
        self.assertEqual(queue_response.data[0]['name'], 'New Hero')

        response = self.client.patch(
            f'/api/fandoms/character-submissions/manage/{submission_id}/',
            {'status': 'APPROVED'}, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(CharacterProfile.objects.filter(name='New Hero').exists())

        self.client.force_authenticate(user=None)
        response = self.client.get('/api/fandoms/characters/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
