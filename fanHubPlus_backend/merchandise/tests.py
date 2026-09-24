# merchandise/tests.py

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from fandoms.models import Category
from .models import MerchandiseItem
from .services import ViewCounterService


class MerchandiseTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.anime = Category.objects.create(name='Anime', slug='anime', icon='Tv')
        self.gaming = Category.objects.create(name='Gaming', slug='gaming', icon='Gamepad2')

        self.item1 = MerchandiseItem.objects.create(
            name='EVA-01 Berserk Mode 1/4 Scale Statue',
            slug='merch-eva',
            category=self.anime,
            tag=MerchandiseItem.Tag.LIMITED_EDITION,
            is_upcoming=True,
            msrp='$340 MSRP (Preview)',
            view_count=100
        )
        self.item2 = MerchandiseItem.objects.create(
            name='Shadow of the Erdtree Vinyl Boxset',
            slug='merch-elden',
            category=self.gaming,
            tag=MerchandiseItem.Tag.PRE_ORDER,
            is_upcoming=False,
            msrp='$110 MSRP (Preview)',
            view_count=50
        )

    def test_merchandise_gallery(self):
        response = self.client.get('/api/merchandise/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 2)

    def test_filter_by_tag_and_upcoming(self):
        # Filter by tag
        res = self.client.get('/api/merchandise/?tag=LIMITED_EDITION')
        results = res.data['results'] if 'results' in res.data else res.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['slug'], 'merch-eva')

        # Upcoming drops
        res_upcoming = self.client.get('/api/merchandise/upcoming/')
        up_results = res_upcoming.data['results'] if 'results' in res_upcoming.data else res_upcoming.data
        self.assertEqual(len(up_results), 1)
        self.assertEqual(up_results[0]['slug'], 'merch-eva')

    def test_view_counter_service_atomic_increment(self):
        initial_views = self.item1.view_count
        new_count = ViewCounterService.increment_view_count(self.item1.id)
        self.assertEqual(new_count, initial_views + 1)
        self.item1.refresh_from_db()
        self.assertEqual(self.item1.view_count, initial_views + 1)

    def test_track_click_api(self):
        initial_views = self.item2.view_count
        response = self.client.post(f'/api/merchandise/{self.item2.slug}/track-click/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['view_count'], initial_views + 1)
