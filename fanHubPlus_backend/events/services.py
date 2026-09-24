# events/services.py

import math
from datetime import datetime, time
from django.utils import timezone
from .models import Event


class GeoDistanceCalculator:
    """
    Computes spatial distance using the Haversine equation to find events
    within a designated radius of the client's latitude and longitude.
    Implements a fast bounding-box pre-filter followed by precise Haversine distance.
    """
    EARTH_RADIUS_KM = 6371.0

    @classmethod
    def haversine_distance(cls, lat1, lon1, lat2, lon2):
        """
        Calculates the great circle distance between two points on Earth in kilometers.
        """
        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = (
            math.sin(delta_phi / 2.0) ** 2 +
            math.cos(phi1) * math.cos(phi2) * (math.sin(delta_lambda / 2.0) ** 2)
        )
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
        return round(cls.EARTH_RADIUS_KM * c, 2)

    @classmethod
    def find_nearby_events(cls, user_lat, user_lng, radius_km=100.0, category_slug=None):
        """
        Applies bounding box pre-filter on DB records, then exact Haversine calculation.
        """
        user_lat = float(user_lat)
        user_lng = float(user_lng)
        radius_km = float(radius_km)

        # 1 deg latitude ~ 111.045 km
        lat_delta = radius_km / 111.045
        # 1 deg longitude ~ 111.045 * cos(lat)
        cos_lat = math.cos(math.radians(user_lat))
        lng_delta = radius_km / (111.045 * cos_lat) if abs(cos_lat) > 0.0001 else 180.0

        min_lat = max(-90.0, user_lat - lat_delta)
        max_lat = min(90.0, user_lat + lat_delta)
        min_lng = max(-180.0, user_lng - lng_delta)
        max_lng = min(180.0, user_lng + lng_delta)

        # Bounding box SQL query
        candidates = Event.objects.filter(
            latitude__gte=min_lat,
            latitude__lte=max_lat,
            longitude__gte=min_lng,
            longitude__lte=max_lng
        ).select_related('category')

        if category_slug:
            candidates = candidates.filter(category__slug=category_slug)

        results = []
        for event in candidates:
            dist = cls.haversine_distance(user_lat, user_lng, event.latitude, event.longitude)
            if dist <= radius_km:
                results.append((event, dist))

        # Sort by distance
        results.sort(key=lambda x: x[1])
        return results

    @classmethod
    def to_geojson(cls, events_with_distance):
        """
        Transforms a list of (Event, distance_km) into GeoJSON FeatureCollection.
        """
        features = []
        for event, dist in events_with_distance:
            feature = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [event.longitude, event.latitude],
                },
                'properties': {
                    'id': event.id,
                    'title': event.title,
                    'slug': event.slug,
                    'city': event.city,
                    'venue_name': event.venue_name,
                    'category_id': event.category_id,
                    'category_name': event.category.name if event.category else '',
                    'category_slug': event.category.slug if event.category else '',
                    'accent_color': event.category.accent_color if event.category else '#38BDF8',
                    'start_date': str(event.start_date),
                    'end_date': str(event.end_date) if event.end_date else None,
                    'date_month': event.date_month,
                    'date_day': event.date_day,
                    'year': event.year,
                    'ticket_url': event.ticket_url,
                    'attendees_info': event.attendees_info,
                    'status': event.status,
                    'distance_km': dist,
                    'map_x': event.map_x,
                    'map_y': event.map_y,
                }
            }
            features.append(feature)

        return {
            'type': 'FeatureCollection',
            'features': features,
        }


class CalendarFeedGenerator:
    """
    Transforms event schedules into standard iCalendar (.ics) format
    and structured JSON calendars for client integration.
    """
    @staticmethod
    def generate_ics(event):
        """
        Generates RFC 5545 compliant iCalendar string for an Event.
        """
        start_str = event.start_date.strftime('%Y%m%d')
        end_date = event.end_date or event.start_date
        end_str = end_date.strftime('%Y%m%d')

        ics_lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Fan Hub Plus//Event Radar//EN",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",
            f"UID:fanhub-event-{event.id}@{event.slug}",
            f"DTSTAMP:{timezone.now().strftime('%Y%m%dT%H%M%SZ')}",
            f"DTSTART;VALUE=DATE:{start_str}",
            f"DTEND;VALUE=DATE:{end_str}",
            f"SUMMARY:{event.title}",
            f"DESCRIPTION:{event.description or event.title}",
            f"LOCATION:{event.venue_name}, {event.city}",
            f"URL:{event.ticket_url or ''}",
            "END:VEVENT",
            "END:VCALENDAR",
        ]
        return "\r\n".join(ics_lines)

    @staticmethod
    def generate_json_calendar(queryset):
        return [
            {
                'id': e.id,
                'title': e.title,
                'slug': e.slug,
                'city': e.city,
                'venue': e.venue_name,
                'start': str(e.start_date),
                'end': str(e.end_date) if e.end_date else str(e.start_date),
                'month': e.date_month,
                'day': e.date_day,
                'year': e.year,
                'category': e.category.name if e.category else '',
                'category_slug': e.category.slug if e.category else '',
                'accent_color': e.category.accent_color if e.category else '#38BDF8',
                'ticket_url': e.ticket_url,
                'status': e.status,
            }
            for e in queryset
        ]
