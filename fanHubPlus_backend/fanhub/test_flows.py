# fanhub/test_flows.py

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from fandoms.models import Category, Content
from events.models import Event
from chatbot.models import ChatbotFAQ, ChatbotQuery
from interactions.models import Bookmark, ContentRating, FanSubmission

User = get_user_model()


class EndToEndSystemFlowsTest(TestCase):
    """
    Validates all 6 End-to-End Operational System Flows specified in the Architectural Blueprint.
    """
    def setUp(self):
        self.client = APIClient()

        # Seed categories
        self.anime = Category.objects.create(name='Anime', slug='anime', icon='Tv', accent_color='#A3E635')
        self.gaming = Category.objects.create(name='Gaming', slug='gaming', icon='Gamepad2', accent_color='#FACC15')

        # Seed content
        self.c1 = Content.objects.create(
            title='Attack on Titan Finale',
            slug='titan-finale',
            category=self.anime,
            content_type=Content.ContentType.VIDEO,
            synopsis='Titan colossal showdown in Shiganshina.',
            popularity_score=4.9,
            is_published=True
        )

        # Seed FAQ
        self.faq = ChatbotFAQ.objects.create(
            question='Recommend me an anime like Attack on Titan',
            answer='86, Vinland Saga, and Claymore.',
            category=self.anime,
            badge='Anime Lore • Curated',
            is_active=True
        )

        # Seed Event
        self.event_lagos = Event.objects.create(
            title='Naija Pop-Con Lagos',
            slug='event-lagos',
            city='Lagos',
            venue_name='Landmark Centre',
            category=self.anime,
            start_date='2026-11-18',
            latitude=6.4281,
            longitude=3.4219,
        )

        # Admin user
        self.admin = User.objects.create_superuser(
            email='admin@fanhub.com',
            username='admin_boss',
            password='AdminPassword123!'
        )

    def test_flow_1_visitor_to_member_and_dashboard_hydration(self):
        """
        Flow 1:
        1. Visitor GET /api/content/
        2. Visitor POST /api/register
        3. Member GET /api/dashboard/ with Bearer token
        """
        # 1. Unauthenticated browsing
        res_browse = self.client.get('/api/content/')
        self.assertEqual(res_browse.status_code, status.HTTP_200_OK)

        # 2. Registration
        reg_payload = {
            'email': 'flow1user@fanhub.com',
            'username': 'flow1user',
            'password': 'SecurePassword123!',
            'password_confirm': 'SecurePassword123!',
            'favorite_categories': ['anime']
        }
        res_reg = self.client.post('/api/register', reg_payload, format='json')
        self.assertEqual(res_reg.status_code, status.HTTP_201_CREATED)
        access_token = res_reg.data['tokens']['access']

        # 3. Authenticated Dashboard Hydration
        auth_client = APIClient()
        auth_client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        res_dash = auth_client.get('/api/dashboard/')
        self.assertEqual(res_dash.status_code, status.HTTP_200_OK)
        self.assertEqual(res_dash.data['user']['email'], 'flow1user@fanhub.com')
        self.assertEqual(len(res_dash.data['profile']['favorite_categories']), 1)
        self.assertEqual(res_dash.data['profile']['favorite_categories'][0]['slug'], 'anime')
        self.assertGreaterEqual(len(res_dash.data['personalized_recommendations']), 1)

    def test_flow_2_multi_level_content_exploration_and_search(self):
        """
        Flow 2:
        GET /api/content/?category=anime&type=video&sort=popular&search=titan
        """
        res = self.client.get('/api/content/?category=anime&type=video&sort=popular&search=titan')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        results = res.data['results'] if 'results' in res.data else res.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['slug'], 'titan-finale')
        self.assertEqual(results[0]['content_type'], 'VIDEO')

    def test_flow_3_media_interaction_and_dynamic_popularity_scoring(self):
        """
        Flow 3:
        POST /content/42/rate with {score: 5} -> triggers score calculation
        Score = (Rating_avg * 0.7) + (log10(Bookmarks + 1) * 0.3)
        """
        user = User.objects.create_user(email='rater@fanhub.com', username='rater', password='Pass123!')
        self.client.force_authenticate(user=user)

        rate_url = f'/content/{self.c1.id}/rate'
        res = self.client.post(rate_url, {'score': 5}, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['user_score'], 5)

        self.c1.refresh_from_db()
        self.assertAlmostEqual(self.c1.popularity_score, 3.5, places=2)

    def test_flow_4_fan_submission_and_admin_moderation_pipeline(self):
        """
        Flow 4:
        1. Member POST /api/fan-submissions {title, body, category_id}
        2. Admin GET /api/interactions/moderation/
        3. Admin PATCH /api/interactions/moderation/<id>/ {status: 'APPROVED'}
        4. Copy to Content table and published
        """
        member = User.objects.create_user(email='creator@fanhub.com', username='creator', password='Pass123!')
        self.client.force_authenticate(user=member)

        # 1. Post submission
        sub_res = self.client.post('/api/fan-submissions', {
            'category_id': self.anime.id,
            'title': 'The Philosophy of Erwin Smith',
            'body': 'My soldiers rage! My soldiers scream! An analysis of courageous conviction.'
        }, format='json')
        self.assertEqual(sub_res.status_code, status.HTTP_201_CREATED)
        sub_id = sub_res.data['id']
        self.assertEqual(sub_res.data['status'], 'PENDING')

        # 2. Admin queue
        self.client.force_authenticate(user=self.admin)
        queue_res = self.client.get('/api/interactions/moderation/')
        self.assertEqual(queue_res.status_code, status.HTTP_200_OK)
        queue_items = queue_res.data['results'] if 'results' in queue_res.data else queue_res.data
        self.assertTrue(any(item['id'] == sub_id for item in queue_items))

        # 3. Admin Approval
        patch_res = self.client.patch(f'/api/interactions/moderation/{sub_id}/', {
            'status': 'APPROVED',
            'admin_feedback': 'Verified high quality lore analysis.'
        }, format='json')
        self.assertEqual(patch_res.status_code, status.HTTP_200_OK)
        self.assertEqual(patch_res.data['status'], 'APPROVED')

        # 4. Check Content table copy
        pub_id = patch_res.data['published_content_id']
        published = Content.objects.get(pk=pub_id)
        self.assertEqual(published.title, 'The Philosophy of Erwin Smith')
        self.assertTrue(published.is_published)

    def test_flow_5_geolocation_convention_radar(self):
        """
        Flow 5:
        GET /api/events/radar?lat=6.42&lng=3.42&radius_km=50
        Outputs GeoJSON FeatureCollection with distance_km
        """
        res = self.client.get('/api/events/radar?lat=6.42&lng=3.42&radius_km=50')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['type'], 'FeatureCollection')
        features = res.data['features']
        self.assertEqual(len(features), 1)
        self.assertEqual(features[0]['properties']['slug'], 'event-lagos')
        self.assertIn('distance_km', features[0]['properties'])
        self.assertLess(features[0]['properties']['distance_km'], 5.0)

    def test_flow_6_ai_chatbot_conversational_assistant(self):
        """
        Flow 6:
        1. Contextual FAQ Hit: POST /api/chatbot {message, session_id}
        2. General Lore Fallback & Query Audit Log
        """
        # Exact FAQ hit
        res_faq = self.client.post('/api/chatbot', {
            'message': 'Recommend me an anime like Attack on Titan',
            'session_id': 'sess-flow-6'
        }, format='json')
        self.assertEqual(res_faq.status_code, status.HTTP_200_OK)
        self.assertEqual(res_faq.data['matched_faq'], self.faq.id)
        self.assertEqual(res_faq.data['badge'], 'Anime Lore • Curated')

        # Fallback question
        res_fallback = self.client.post('/api/chatbot', {
            'message': 'Tell me about the zero clutter policy',
            'session_id': 'sess-flow-6'
        }, format='json')
        self.assertEqual(res_fallback.status_code, status.HTTP_200_OK)
        self.assertIsNone(res_fallback.data['matched_faq'])
        self.assertIn('Zero-Clutter', res_fallback.data['response'])

        # Audit table logged both
        queries = ChatbotQuery.objects.filter(session_id='sess-flow-6')
        self.assertEqual(queries.count(), 2)

    def test_swagger_and_openapi_endpoints(self):
        """
        Validates OpenAPI schema generation and interactive Swagger UI / ReDoc routes.
        """
        # 1. OpenAPI 3.0 schema
        schema_res = self.client.get('/api/schema/')
        self.assertEqual(schema_res.status_code, status.HTTP_200_OK)

        # 2. Interactive Swagger UI
        swagger_res = self.client.get('/api/docs/')
        self.assertEqual(swagger_res.status_code, status.HTTP_200_OK)
        self.assertIn(b'swagger-ui', swagger_res.content.lower())

        # 3. Swagger UI alias
        alias_res = self.client.get('/swagger/')
        self.assertEqual(alias_res.status_code, status.HTTP_200_OK)

        # 4. ReDoc documentation
        redoc_res = self.client.get('/api/redoc/')
        self.assertEqual(redoc_res.status_code, status.HTTP_200_OK)
        self.assertIn(b'redoc', redoc_res.content.lower())
