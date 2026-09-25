# events/views.py

from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse

from .models import Event
from .serializers import EventSerializer
from .services import GeoDistanceCalculator, CalendarFeedGenerator
from interactions.views import IsAdminOrReadOnly
from fandoms.views import DualLookupMixin


class EventRadarMapView(APIView):
    """
    GET /api/events/radar/
    Outputs GeoJSON formatted points containing coordinates, venue names,
    category pins, and exact Haversine distances for map visualization.
    Query params: lat, lng, radius_km (default 100), category
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Events'],
        summary='Search nearby conventions using GPS coordinates & Haversine distance',
        parameters=[
            OpenApiParameter(name='lat', type=float, description='Client latitude (e.g. 6.4281)', required=False),
            OpenApiParameter(name='lng', type=float, description='Client longitude (e.g. 3.4219)', required=False),
            OpenApiParameter(name='radius_km', type=float, description='Search radius in kilometers (default 100)', required=False),
            OpenApiParameter(name='category', type=str, description='Filter by category slug', required=False),
        ],
        responses={
            200: OpenApiResponse(description='GeoJSON FeatureCollection with point coordinates and distances.')
        }
    )
    def get(self, request, *args, **kwargs):
        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')
        radius_km = request.query_params.get('radius_km', 100.0)
        category_slug = request.query_params.get('category')

        if lat is not None and lng is not None:
            try:
                events_with_dist = GeoDistanceCalculator.find_nearby_events(
                    user_lat=float(lat),
                    user_lng=float(lng),
                    radius_km=float(radius_km),
                    category_slug=category_slug
                )
                geojson_data = GeoDistanceCalculator.to_geojson(events_with_dist)
                return Response(geojson_data, status=status.HTTP_200_OK)
            except ValueError:
                return Response({'error': 'Invalid lat, lng or radius_km.'}, status=status.HTTP_400_BAD_REQUEST)

        qs = Event.objects.all().select_related('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        events_with_dist = [(e, 0.0) for e in qs]
        geojson_data = GeoDistanceCalculator.to_geojson(events_with_dist)
        return Response(geojson_data, status=status.HTTP_200_OK)


@extend_schema(
    tags=['Events'],
    summary='Chronological list of conventions and gatherings'
)
class EventCalendarListView(generics.ListCreateAPIView):
    """
    GET /api/events/calendar/
    POST /api/events/calendar/ (Admin only)
    Delivers chronologically ordered events filterable by target city or month.
    """
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        qs = Event.objects.all().select_related('category')
        city = self.request.query_params.get('city')
        month = self.request.query_params.get('month')
        category = self.request.query_params.get('category')
        year = self.request.query_params.get('year')

        if city:
            qs = qs.filter(city__icontains=city)
        if month:
            qs = qs.filter(date_month__iexact=month)
        if category:
            if str(category).isdigit():
                qs = qs.filter(category_id=int(category))
            else:
                qs = qs.filter(category__slug=category)
        if year:
            qs = qs.filter(year=year)

        return qs.order_by('start_date')


EventCalendarView = EventCalendarListView


@extend_schema(tags=['Events'], summary='Retrieve, update, or delete event by slug or ID')
class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/events/<slug_or_id>/
    PATCH/DELETE /api/events/<slug_or_id>/ (Admin only)
    """
    queryset = Event.objects.all().select_related('category')
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_object(self):
        lookup = self.kwargs.get('slug')
        if str(lookup).isdigit():
            return get_object_or_404(self.get_queryset(), pk=int(lookup))
        return get_object_or_404(self.get_queryset(), slug=lookup)


@extend_schema(tags=['Events Admin'], summary='Manage event highlights and conventions')
class AdminEventViewSet(DualLookupMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all().select_related('category').order_by('start_date')
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    pagination_class = None


class EventICSExportView(APIView):
    """
    GET /api/events/<slug_or_id>/ics/
    Returns standard RFC 5545 iCalendar .ics file download for the event.
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Events'],
        summary='Download RFC 5545 iCalendar (.ics) invite file',
        responses={200: OpenApiResponse(description='text/calendar .ics file')}
    )
    def get(self, request, slug, *args, **kwargs):
        if str(slug).isdigit():
            event = get_object_or_404(Event, pk=int(slug))
        else:
            event = get_object_or_404(Event, slug=slug)

        ics_content = CalendarFeedGenerator.generate_ics(event)
        response = HttpResponse(ics_content, content_type='text/calendar; charset=utf-8')
        response['Content-Disposition'] = f'attachment; filename="{event.slug}.ics"'
        return response
