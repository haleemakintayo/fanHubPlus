# chatbot/services.py

import time
import re
from .models import ChatbotFAQ, ChatbotQuery
from fandoms.models import Content, Category


class ContextMatcher:
    """
    Scans inbound queries against ChatbotFAQ keywords and category tags
    to answer frequently asked questions without consuming external API tokens.
    """
    @classmethod
    def find_match(cls, query_text):
        if not query_text:
            return None

        clean_query = query_text.strip().lower()
        active_faqs = ChatbotFAQ.objects.filter(is_active=True)

        # 1. Exact match on question
        for faq in active_faqs:
            if clean_query == faq.question.lower().strip():
                return faq

        # 2. Key phrase containment in question or tags
        best_match = None
        highest_score = 0
        query_words = set(re.findall(r'\w+', clean_query))

        for faq in active_faqs:
            faq_words = set(re.findall(r'\w+', faq.question.lower()))
            overlap = len(query_words.intersection(faq_words))

            # Check tags overlap
            for tag in (faq.tags or []):
                tag_words = set(re.findall(r'\w+', str(tag).lower()))
                overlap += len(query_words.intersection(tag_words)) * 2

            if overlap > highest_score and overlap >= 2:
                highest_score = overlap
                best_match = faq

        return best_match


class PromptOrchestrator:
    """
    Assembles platform system prompts, recent content titles,
    and conversation history before dispatching to an LLM provider or fallback rule engine.
    """
    DEFAULT_SUGGESTIONS = [
        "Recommend me an anime like Attack on Titan",
        "Where do I start reading X-Men comics?",
        "Upcoming gaming conventions in Q4",
        "How do I submit fan art or reviews?",
    ]

    @classmethod
    def generate_response(cls, user_message, session_id=None, user=None):
        start_time = time.time()

        # Step 1: Check deterministic FAQ context
        matched_faq = ContextMatcher.find_match(user_message)
        if matched_faq:
            latency = round((time.time() - start_time) * 1000, 2)
            ChatAuditLogger.log_query(
                user=user,
                session_id=session_id or 'anon',
                message=user_message,
                response=matched_faq.answer,
                matched_faq=matched_faq,
                latency_ms=latency
            )
            return {
                'response': matched_faq.answer,
                'matched_faq': matched_faq.id,
                'badge': matched_faq.badge,
                'universe': matched_faq.universe_name or (matched_faq.category.name if matched_faq.category else 'General'),
                'latency_ms': latency,
                'suggestions': cls.DEFAULT_SUGGESTIONS,
            }

        # Step 2: Contextual fallback / lore reasoning engine
        response_text, universe, badge = cls._orchestrate_fallback(user_message)
        latency = round((time.time() - start_time) * 1000, 2)

        ChatAuditLogger.log_query(
            user=user,
            session_id=session_id or 'anon',
            message=user_message,
            response=response_text,
            matched_faq=None,
            latency_ms=latency
        )

        return {
            'response': response_text,
            'matched_faq': None,
            'badge': badge,
            'universe': universe,
            'latency_ms': latency,
            'suggestions': cls.DEFAULT_SUGGESTIONS,
        }

    @classmethod
    def _orchestrate_fallback(cls, message):
        msg = message.lower()

        if any(w in msg for w in ['submit', 'article', 'fan art', 'moderation', 'draft']):
            return (
                "You can submit fan creations directly to our Community Vault! "
                "Once submitted via the 'Submit Fan Creation' portal, our moderators review your draft. "
                "Approved submissions are published into the main Multiverse catalog with full attribution.",
                "Community",
                "Platform Guide"
            )

        if any(w in msg for w in ['policy', 'clutter', 'rules', 'spam']):
            return (
                "Fan Hub Plus operates under a strict Zero-Clutter & Admin-Vetted Policy. "
                "All public submissions pass through a rigorous moderation pipeline to prevent spam, "
                "ensuring our feeds remain curated, high-aesthetic, and signal-rich.",
                "Platform",
                "Policy • Zero-Clutter"
            )

        if any(w in msg for w in ['event', 'convention', 'con', 'meetup', 'radar']):
            return (
                "Our Convention & Gathering Radar tracks global fandom milestones in Tokyo, Los Angeles, London, and Lagos. "
                "Use the interactive Radar map to calculate distance from your GPS coordinates and download .ics calendar invites!",
                "Events",
                "Event Radar"
            )

        # Dynamic Content retrieval from catalog
        recent_items = Content.objects.filter(is_published=True).order_by('-popularity_score')[:3]
        item_titles = ", ".join([f'"{item.title}"' for item in recent_items]) if recent_items.exists() else "top trending releases"

        return (
            f"I am your Fan Hub Plus Multiverse AI guide! "
            f"I can recommend titles, explain multiverse timelines, track convention dates, and guide your submissions. "
            f"Currently trending in our vault: {item_titles}. How can I assist your fandom journey today?",
            "Multiverse AI",
            "Lore Assistant"
        )


class ChatAuditLogger:
    """
    Audit table logger recording inbound user prompts, AI responses, and latency metrics.
    """
    @staticmethod
    def log_query(user, session_id, message, response, matched_faq=None, latency_ms=0.0):
        try:
            return ChatbotQuery.objects.create(
                user=user,
                session_id=session_id,
                message=message,
                response=response,
                matched_faq=matched_faq,
                latency_ms=latency_ms
            )
        except Exception:
            return None
