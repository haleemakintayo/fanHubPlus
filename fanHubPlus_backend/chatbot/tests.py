# chatbot/tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from fandoms.models import Category
from .models import ChatbotFAQ, ChatbotQuery
from .services import ContextMatcher, PromptOrchestrator

User = get_user_model()


class ChatbotTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            email='admin@fanhub.com',
            username='admin_bot',
            password='AdminPassword123!'
        )
        self.anime = Category.objects.create(name='Anime', slug='anime', icon='Tv')
        self.faq1 = ChatbotFAQ.objects.create(
            question='Recommend me an anime like Attack on Titan',
            answer='Check out 86, Vinland Saga, and Claymore in our catalog!',
            universe_name='Anime',
            badge='Anime Lore • Curated',
            tags=['anime', 'attack on titan', 'recommendation'],
            category=self.anime,
            is_active=True
        )

    def test_context_matcher_exact_and_fuzzy(self):
        match1 = ContextMatcher.find_match('Recommend me an anime like Attack on Titan')
        self.assertIsNotNone(match1)
        self.assertEqual(match1.id, self.faq1.id)

        match2 = ContextMatcher.find_match('Any recommendation like attack on titan?')
        self.assertIsNotNone(match2)
        self.assertEqual(match2.id, self.faq1.id)

    def test_chatbot_query_api_exact_faq_hit(self):
        url = '/api/chatbot/query/'
        response = self.client.post(url, {
            'message': 'Recommend me an anime like Attack on Titan',
            'session_id': 'sess-test-101'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['matched_faq'], self.faq1.id)
        self.assertIn('86, Vinland Saga', response.data['response'])
        self.assertEqual(response.data['badge'], 'Anime Lore • Curated')
        self.assertTrue(ChatbotQuery.objects.filter(session_id='sess-test-101').exists())

    def test_chatbot_query_api_fallback_lore(self):
        url = '/api/chatbot/query/'
        response = self.client.post(url, {
            'message': 'How does the fan article submission and moderation process work?',
            'session_id': 'sess-test-102'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNone(response.data['matched_faq'])
        self.assertIn('Community Vault', response.data['response'])
        self.assertIn('suggestions', response.data)

    def test_admin_chatbot_tune_view(self):
        # Trigger a query first
        self.client.post('/api/chatbot/query/', {
            'message': 'Recommend me an anime like Attack on Titan',
            'session_id': 'sess-stat'
        }, format='json')

        self.client.force_authenticate(user=self.admin)
        res = self.client.get('/api/chatbot/audit/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(res.data['total_queries'], 1)
        self.assertIn('faq_hit_rate_pct', res.data)
        self.assertIn('recent_queries', res.data)
