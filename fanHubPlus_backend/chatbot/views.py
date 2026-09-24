# chatbot/views.py

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count
from drf_spectacular.utils import extend_schema, OpenApiResponse

from .models import ChatbotFAQ, ChatbotQuery
from .serializers import (
    ChatbotFAQSerializer,
    ChatbotQuerySerializer,
    ChatbotMessageInputSerializer,
)
from .services import PromptOrchestrator
from interactions.views import IsAdminRole


class ChatbotMessageAPIView(APIView):
    """
    POST /api/chatbot/query/
    Accepts incoming user messages, executes session matching, logs the transaction,
    and returns deterministic FAQ answers or orchestrated AI lore responses.
    Body: {"message": "Recommend me an anime like Attack on Titan", "session_id": "sess-123"}
    """
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        tags=['Chatbot'],
        summary='Submit prompt to FandomBot AI / FAQ Matcher',
        request=ChatbotMessageInputSerializer,
        responses={
            200: OpenApiResponse(description='Deterministic FAQ match or orchestrated AI response with chips.')
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = ChatbotMessageInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_message = serializer.validated_data['message']
        session_id = serializer.validated_data.get('session_id', 'anon-session')
        user = request.user if request.user.is_authenticated else None

        result = PromptOrchestrator.generate_response(
            user_message=user_message,
            session_id=session_id,
            user=user
        )
        return Response(result, status=status.HTTP_200_OK)


ChatbotQueryView = ChatbotMessageAPIView


@extend_schema(tags=['Chatbot'], summary='List active Chatbot FAQ knowledge base entries')
class FAQKnowledgeBaseView(generics.ListAPIView):
    """
    GET /api/chatbot/faqs/
    Public endpoint providing access to curated FAQ knowledge base.
    """
    queryset = ChatbotFAQ.objects.filter(is_active=True).select_related('category')
    serializer_class = ChatbotFAQSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        return qs


class AdminChatbotTuneView(APIView):
    """
    GET /api/chatbot/audit/
    Admin metrics on query volume, average latency, FAQ hit rate, and query logs.
    """
    permission_classes = [IsAdminRole]

    @extend_schema(
        tags=['Chatbot Admin'],
        summary='Audit dashboard analytics for AI queries and latency metrics',
        responses={
            200: OpenApiResponse(description='Total queries, hit rate percentage, latency, and recent logs.')
        }
    )
    def get(self, request, *args, **kwargs):
        total_queries = ChatbotQuery.objects.count()
        faq_hits = ChatbotQuery.objects.filter(matched_faq__isnull=False).count()
        hit_rate = round((faq_hits / total_queries * 100), 1) if total_queries > 0 else 0.0

        stats = ChatbotQuery.objects.aggregate(
            avg_latency=Avg('latency_ms')
        )

        recent_queries = ChatbotQuery.objects.select_related('user', 'matched_faq').order_by('-created_at')[:20]
        recent_serialized = ChatbotQuerySerializer(recent_queries, many=True).data

        return Response({
            'total_queries': total_queries,
            'faq_hits': faq_hits,
            'fallback_queries': total_queries - faq_hits,
            'faq_hit_rate_pct': hit_rate,
            'avg_latency_ms': round(stats['avg_latency'] or 0.0, 2),
            'recent_queries': recent_serialized,
        }, status=status.HTTP_200_OK)
