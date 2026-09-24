# events/tests.py

from datetime import date
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from fandoms.models import Category
from .models import Event
from .services import GeoDistanceCalculator, CalendarFeedGenerator


class EventsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.anime = Category.objects.create(name='Anime', slug='anime', icon='Tv')

        # Lagos event (approx lat 6.4281, lng 3.4219)
        self.lagos_event = Event.objects.create(
            title='Naija Pop-Con Lagos',
            slug='event-lagos',
            city='Lagos',
            venue_name='Landmark Centre',
            category=self.anime,
            start_date=date(2026, 11, 18),
            end_date=date(2026, 11, 20),
            date_month='NOV',
            date_day='18-20',
            year='2026',
            latitude=6.4281,
            longitude=3.4219,
            ticket_url='https://naijapopcon.ng'
        )

        # Tokyo event (approx lat 35.6300, lng 139.7930)
        self.tokyo_event = Event.objects.create(
            title='Comiket 106 Tokyo',
            slug='event-tokyo',
            city='Tokyo',
            venue_name='Tokyo Big Sight',
            category=self.anime,
            start_date=date(2026, 8, 14),
            end_date=date(2026, 8, 16),
            date_month='AUG',
            date_day='14-16',
            year='2026',
            latitude=35.6300,
            longitude=139.7930,
        )

    def test_haversine_and_radar_lookup(self):
        # Query near Lagos (lat=6.45, lng=3.40, radius=50km)
        nearby = GeoDistanceCalculator.find_nearby_events(
            user_lat=6.45,
            user_lng=3.40,
            radius_km=50.0
        )
        self.assertEqual(len(nearby), 1)
        event, dist = nearby[0]
        self.assertEqual(event.slug, 'event-lagos')
        self.assertLess(dist, 10.0) # Within 10 km

    def test_event_radar_api_geojson(self):
        # Request /api/events/radar/?lat=6.45&lng=3.40&radius_km=50
        response = self.client.get('/api/events/radar/?lat=6.45&lng=3.40&radius_km=50')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['type'], 'FeatureCollection')
        features = response.data['features']
        self.assertEqual(len(features), 1)
        self.assertEqual(features[0]['properties']['slug'], 'event-lagos')
        self.assertEqual(features[0]['geometry']['type'], 'Point')

    def test_calendar_feed_generator_ics(self):
        ics_text = CalendarFeedGenerator.generate_ics(self.lagos_event)
        self.assertIn("BEGIN:VCALENDAR", ics_text)
        self.assertIn("SUMMARY:Naija Pop-Con Lagos", ics_text)
        self.assertIn("LOCATION:Landmark Centre, Lagos", ics_text)
        self.assertIn("END:VCALENDAR", ics_text)

        # Test ICS export endpoint
        res = self.client.get(f'/api/events/{self.lagos_event.slug}/ics/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res['Content-Type'], 'text/calendar; charset=utf-8')
