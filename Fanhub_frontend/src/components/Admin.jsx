import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { adminApi } from '../services/api';
import {
  BarChart3,
  FileText,
  Users,
  Calendar,
  ShoppingBag,
  Bot,
  ShieldCheck,
  MessageSquareWarning,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  RefreshCw,
  Eye,
  Activity,
  TrendingUp,
  Layers,
  LogOut,
  Search,
} from 'lucide-react';

const EIGHT_FANDOM_CATEGORIES = [
  { slug: 'anime', name: 'Anime', color: '#A3E635' },
  { slug: 'gaming', name: 'Gaming', color: '#FACC15' },
  { slug: 'movies-tv', name: 'Movies', color: '#38BDF8' },
  { slug: 'tv-shows', name: 'TV Shows', color: '#60A5FA' },
  { slug: 'kpop', name: 'K-Pop', color: '#F43F5E' },
  { slug: 'comics', name: 'Comics', color: '#FB7185' },
  { slug: 'manga', name: 'Manga', color: '#FB923C' },
  { slug: 'cosplay', name: 'Cosplay', color: '#C084FC' },
];

const FALLBACK_ANALYTICS = {
  overview: {
    total_users: 142,
    active_users: 128,
    verified_users: 114,
    admin_users: 3,
    member_users: 139,
    total_content: 18,
    published_content: 16,
    total_characters: 8,
    total_events: 5,
    total_merchandise: 6,
    total_bookmarks: 348,
    total_ratings: 512,
    total_submissions: 14,
    pending_submissions: 2,
    total_feedback: 9,
    open_feedback: 4,
    total_content_views: 217300,
    total_merch_views: 8170,
    total_platform_views: 225470,
    total_engagement_actions: 1125,
  },
  popular_categories: [
    { name: 'Anime', slug: 'anime', accent_color: '#A3E635', content_count: 6, favorites_count: 84, bookmarks_count: 142, total_views: 123820, avg_popularity_score: 4.95, engagement_score: 312.4 },
    { name: 'Movies', slug: 'movies-tv', accent_color: '#38BDF8', content_count: 4, favorites_count: 68, bookmarks_count: 95, total_views: 51000, avg_popularity_score: 4.8, engagement_score: 248.0 },
    { name: 'Gaming', slug: 'gaming', accent_color: '#FACC15', content_count: 4, favorites_count: 72, bookmarks_count: 88, total_views: 24710, avg_popularity_score: 4.9, engagement_score: 234.7 },
    { name: 'K-Pop', slug: 'kpop', accent_color: '#F43F5E', content_count: 3, favorites_count: 54, bookmarks_count: 64, total_views: 14800, avg_popularity_score: 4.7, engagement_score: 186.8 },
    { name: 'TV Shows', slug: 'tv-shows', accent_color: '#60A5FA', content_count: 3, favorites_count: 49, bookmarks_count: 52, total_views: 12400, avg_popularity_score: 4.65, engagement_score: 168.2 },
    { name: 'Comics', slug: 'comics', accent_color: '#FB7185', content_count: 3, favorites_count: 42, bookmarks_count: 47, total_views: 11200, avg_popularity_score: 4.6, engagement_score: 151.4 },
    { name: 'Manga', slug: 'manga', accent_color: '#FB923C', content_count: 3, favorites_count: 39, bookmarks_count: 41, total_views: 9800, avg_popularity_score: 4.75, engagement_score: 144.3 },
    { name: 'Cosplay', slug: 'cosplay', accent_color: '#C084FC', content_count: 2, favorites_count: 31, bookmarks_count: 38, total_views: 9200, avg_popularity_score: 4.6, engagement_score: 128.5 },
  ],
  chatbot_metrics: {
    total_queries: 284,
    faq_hits: 218,
    fallback_queries: 66,
    faq_hit_rate_pct: 76.8,
    avg_latency_ms: 14.2,
    active_faqs_count: 6,
    recent_queries: [
      { id: 1, username: 'cyber_otaku', session_id: 'sess-101', message: 'Recommend me an anime like Attack on Titan', matched_faq_question: 'Recommend me an anime like Attack on Titan', latency_ms: 11.4, created_at: new Date().toISOString() },
      { id: 2, username: 'TarnishedSage', session_id: 'sess-102', message: 'Where do I start reading X-Men comics?', matched_faq_question: 'Where do I start reading X-Men comics?', latency_ms: 9.8, created_at: new Date().toISOString() },
      { id: 3, username: 'Guest', session_id: 'sess-103', message: 'Upcoming gaming conventions in Q4', matched_faq_question: 'Upcoming gaming conventions in Q4', latency_ms: 12.6, created_at: new Date().toISOString() },
    ],
  },
  content_metrics: [
    { id: 1, title: 'Demon Slayer: Infinity Castle - Cinematic Teaser', content_type: 'VIDEO', category_name: 'Anime', category_slug: 'anime', view_count: 78000, popularity_score: 5.0, ratings_count: 142, bookmarks_count: 98, is_published: true },
    { id: 2, title: 'Spider-Man: Beyond The Spider-Verse Sneak Peek', content_type: 'VIDEO', category_name: 'Movies', category_slug: 'movies-tv', view_count: 51000, popularity_score: 4.8, ratings_count: 118, bookmarks_count: 76, is_published: true },
    { id: 3, title: 'Cyberpunk: Edgerunners - Official Teaser', content_type: 'VIDEO', category_name: 'Anime', category_slug: 'anime', view_count: 42000, popularity_score: 4.9, ratings_count: 96, bookmarks_count: 84, is_published: true },
    { id: 4, title: 'The Golden Order Suite', content_type: 'AUDIO', category_name: 'Gaming', category_slug: 'gaming', view_count: 22300, popularity_score: 4.95, ratings_count: 64, bookmarks_count: 52, is_published: true },
    { id: 5, title: 'Supernova (Anthem Mix)', content_type: 'AUDIO', category_name: 'K-Pop', category_slug: 'kpop', view_count: 14800, popularity_score: 4.7, ratings_count: 58, bookmarks_count: 41, is_published: true },
    { id: 6, title: 'The Multiverse Paradox: Canon Continuity Deconstruction', content_type: 'ARTICLE', category_name: 'Comics', category_slug: 'comics', view_count: 9200, popularity_score: 4.6, ratings_count: 34, bookmarks_count: 29, is_published: true },
  ],
  merchandise_metrics: [
    { id: 1, name: 'EVA-01 Berserk Mode 1/4 Scale Statue', category_name: 'Anime', tag_display: 'Limited Edition', msrp: '$340 MSRP', manufacturer: 'Prime 1 Studio x Khara', view_count: 3820, popularity_score: 4.77, is_upcoming: true },
    { id: 2, name: 'Shadow of the Erdtree 4xLP Boxset Vinyl', category_name: 'Gaming', tag_display: 'Pre-Order Soon', msrp: '$110 MSRP', manufacturer: 'Bandai Namco Music Live', view_count: 2410, popularity_score: 4.3, is_upcoming: true },
    { id: 3, name: 'Spider-Gwen Multiverse Neon Bomber Jacket', category_name: 'Cosplay', tag_display: 'Official Licensed', msrp: '$165 MSRP', manufacturer: 'Marvel HeroWear Labs', view_count: 1940, popularity_score: 4.15, is_upcoming: false },
  ],
};

export default function Admin({
  embedded = false,
  initialSection = 'analytics',
  onShowToast,
  onClose,
}) {
  const { user, logout } = useAuth();

  // Main Navigation Tab: 'analytics' | 'content' | 'entities' | 'chatbot' | 'moderation'
  const [activeTab, setActiveTab] = useState(
    initialSection === 'moderation' ? 'moderation' : 'analytics'
  );
  const [entitySubTab, setEntitySubTab] = useState('characters'); // 'characters' | 'events' | 'merch'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Analytics State
  const [analytics, setAnalytics] = useState(FALLBACK_ANALYTICS);

  // 2. Content & Multimedia State (Across 8 Fandom Categories)
  const [contentList, setContentList] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('ALL');
  const [contentSearch, setContentSearch] = useState('');
  const [editingContent, setEditingContent] = useState(null); // null or object
  const [showContentForm, setShowContentForm] = useState(false);
  const [contentForm, setContentForm] = useState({
    title: '',
    category_slug: 'anime',
    content_type: 'ARTICLE',
    artist_or_author: '',
    release_year: '2026',
    duration: '5 min read',
    media_url: '',
    thumbnail_url: '',
    synopsis: '',
    body_text: '',
    popularity_score: 4.8,
    is_published: true,
  });

  // 3. Characters, Events, Merchandise State
  const [charactersList, setCharactersList] = useState([]);
  const [showCharForm, setShowCharForm] = useState(false);
  const [editingChar, setEditingChar] = useState(null);
  const [charForm, setCharForm] = useState({
    name: '',
    alias: '',
    category_slug: 'anime',
    archetype: 'Protagonist',
    origin: '',
    faction: '',
    tagline: '',
    biography: '',
    image_url: '',
    weapon: '',
    nemesis: '',
  });

  const [eventsList, setEventsList] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    category_slug: 'anime',
    city: 'Tokyo',
    venue_name: '',
    start_date: '2026-10-15',
    date_month: 'OCT',
    date_day: '15-17',
    year: '2026',
    latitude: 35.63,
    longitude: 139.79,
    attendees_info: '50,000+ Expected',
    status: 'Registration Open',
    description: '',
  });

  const [merchList, setMerchList] = useState([]);
  const [showMerchForm, setShowMerchForm] = useState(false);
  const [editingMerch, setEditingMerch] = useState(null);
  const [merchForm, setMerchForm] = useState({
    name: '',
    category_slug: 'anime',
    tag: 'LIMITED_EDITION',
    msrp: '$150 MSRP (Preview)',
    manufacturer: '',
    drop_date_text: 'Nov 20, 2026 • 12:00 PM EST',
    image_url: '',
    description: '',
    is_upcoming: true,
    view_count: 1000,
  });

  // 4. Chatbot FAQ Knowledge Base State
  const [faqsList, setFaqsList] = useState([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category_slug: 'anime',
    universe_name: 'Anime',
    badge: 'Anime Lore • Curated',
    tagsText: 'anime, lore, recommendation',
    is_active: true,
  });

  // 5. Moderation & Feedback State
  const [moderationQueue, setModerationQueue] = useState([]);
  const [modStatusFilter, setModStatusFilter] = useState('ALL');
  const [modFeedbackNotes, setModFeedbackNotes] = useState({});

  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState('ALL'); // 'ALL' | 'BUG' | 'SUGGESTION' | 'INQUIRY'
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState('ALL'); // 'ALL' | 'NEW' | 'IN_REVIEW' | 'RESOLVED'

  const loadAllAdminData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [
        analyticsRes,
        contentRes,
        charsRes,
        eventsRes,
        merchRes,
        faqsRes,
        modRes,
        fbRes,
      ] = await Promise.allSettled([
        adminApi.getAnalytics(),
        adminApi.getContentList(),
        adminApi.getCharacters(),
        adminApi.getEvents(),
        adminApi.getMerchandise(),
        adminApi.getFaqs(),
        adminApi.getModerationQueue('ALL'),
        adminApi.getFeedbackList('ALL', 'ALL'),
      ]);

      if (analyticsRes.status === 'fulfilled' && analyticsRes.value) {
        setAnalytics(analyticsRes.value);
      }

      if (contentRes.status === 'fulfilled' && contentRes.value) {
        const items = Array.isArray(contentRes.value)
          ? contentRes.value
          : contentRes.value.results || [];
        setContentList(items);
      } else {
        setContentList(FALLBACK_ANALYTICS.content_metrics);
      }

      if (charsRes.status === 'fulfilled' && Array.isArray(charsRes.value)) {
        setCharactersList(charsRes.value);
      }

      if (eventsRes.status === 'fulfilled' && Array.isArray(eventsRes.value)) {
        setEventsList(eventsRes.value);
      }

      if (merchRes.status === 'fulfilled' && Array.isArray(merchRes.value)) {
        setMerchList(merchRes.value);
      } else {
        setMerchList(FALLBACK_ANALYTICS.merchandise_metrics);
      }

      if (faqsRes.status === 'fulfilled' && Array.isArray(faqsRes.value)) {
        setFaqsList(faqsRes.value);
      }

      if (modRes.status === 'fulfilled' && Array.isArray(modRes.value)) {
        setModerationQueue(modRes.value);
      } else {
        setModerationQueue([
          {
            id: 1,
            title: 'Neon Genesis Evangelion: The Instrumentality Timeline Paradox',
            user_username: 'Shinji_K007',
            category_details: { name: 'Anime', slug: 'anime' },
            body: 'An exhaustive comparison between the original End of Evangelion theatrical release and the Rebuild 3.0+1.0 meta-narrative loop.',
            status: 'PENDING',
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            title: 'Elden Ring: Shadow of the Erdtree Miquella Motive Analysis',
            user_username: 'TarnishedSage',
            category_details: { name: 'Gaming', slug: 'gaming' },
            body: 'Tracing Miquella the Kind’s footsteps across the Land of Shadow, examining item descriptions from the Haligtree to Enir-Ilim.',
            status: 'PENDING',
            created_at: new Date().toISOString(),
          },
        ]);
      }

      if (fbRes.status === 'fulfilled' && Array.isArray(fbRes.value)) {
        setFeedbackList(fbRes.value);
      } else {
        setFeedbackList([
          {
            id: 1,
            name: 'cyber_otaku',
            email: 'fan@fanhub.com',
            feedback_type: 'BUG',
            subject: '4K Trailer Player Fullscreen Shortcut on Safari',
            message: 'Pressing F while focused on the volume slider does not trigger fullscreen mode on macOS Safari 18.',
            status: 'IN_REVIEW',
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'LyraBuilder',
            email: 'cosplay.queen@fanhub.com',
            feedback_type: 'SUGGESTION',
            subject: 'Add STL 3D Print File Attachment Support to Cosplay Guides',
            message: 'Would love to attach downloadable .stl pattern links directly inside verified cosplay build articles!',
            status: 'NEW',
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: 'KWave_Stan',
            email: 'seoul.beats@fanhub.com',
            feedback_type: 'INQUIRY',
            subject: 'K-Wave Mega Fest Los Angeles Badge Pickup Hours',
            message: 'Are VIP lightstick sync wristbands distributed at the Crypto.com Arena box office on Day 0?',
            status: 'RESOLVED',
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAllAdminData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadAllAdminData]);

  // ================= CONTENT & MULTIMEDIA CRUD HANDLERS =================
  const filteredContentItems = useMemo(() => {
    return contentList.filter((item) => {
      const itemCatSlug = item.category?.slug || item.category_slug || '';
      const matchesCat =
        selectedCategoryFilter === 'all' ||
        itemCatSlug === selectedCategoryFilter ||
        (selectedCategoryFilter === 'tv-shows' && itemCatSlug === 'movies-tv');
      const matchesType =
        selectedTypeFilter === 'ALL' || item.content_type === selectedTypeFilter;
      const q = contentSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (item.title || '').toLowerCase().includes(q) ||
        (item.artist_or_author || '').toLowerCase().includes(q);
      return matchesCat && matchesType && matchesSearch;
    });
  }, [contentList, selectedCategoryFilter, selectedTypeFilter, contentSearch]);

  const handleOpenNewContent = () => {
    setEditingContent(null);
    setContentForm({
      title: '',
      category_slug: selectedCategoryFilter !== 'all' ? selectedCategoryFilter : 'anime',
      content_type: selectedTypeFilter !== 'ALL' ? selectedTypeFilter : 'ARTICLE',
      artist_or_author: user?.username || 'Admin Curator',
      release_year: '2026',
      duration: '5 min read',
      media_url: '',
      thumbnail_url: '',
      synopsis: '',
      body_text: '',
      popularity_score: 4.8,
      is_published: true,
    });
    setShowContentForm(true);
  };

  const handleStartEditContent = (item) => {
    setEditingContent(item);
    setContentForm({
      title: item.title || '',
      category_slug: item.category?.slug || item.category_slug || 'anime',
      content_type: item.content_type || 'ARTICLE',
      artist_or_author: item.artist_or_author || '',
      release_year: item.release_year || '2026',
      duration: item.duration || '',
      media_url: item.media_url || '',
      thumbnail_url: item.thumbnail_url || '',
      synopsis: item.synopsis || '',
      body_text: item.body_text || '',
      popularity_score: item.popularity_score ?? 4.8,
      is_published: item.is_published ?? true,
    });
    setShowContentForm(true);
  };

  const handleSaveContent = async (e) => {
    e.preventDefault();
    try {
      if (editingContent) {
        const lookup = editingContent.slug || editingContent.id;
        const updated = await adminApi.updateContent(lookup, contentForm);
        setContentList((prev) =>
          prev.map((c) => (c.id === editingContent.id ? { ...c, ...updated } : c))
        );
        onShowToast?.({
          title: 'Content Entry Updated',
          message: `"${contentForm.title}" has been updated in the catalog.`,
          type: 'success',
        });
      } else {
        const created = await adminApi.createContent(contentForm);
        setContentList((prev) => [created, ...prev]);
        onShowToast?.({
          title: 'Content Published',
          message: `"${contentForm.title}" added to ${contentForm.category_slug.toUpperCase()}.`,
          type: 'success',
        });
      }
      setShowContentForm(false);
      setEditingContent(null);
      loadAllAdminData();
    } catch {
      // Optimistic local fallback if offline
      const fallbackEntry = {
        id: editingContent?.id || Date.now(),
        ...contentForm,
        category_name:
          EIGHT_FANDOM_CATEGORIES.find((c) => c.slug === contentForm.category_slug)?.name ||
          contentForm.category_slug,
        view_count: editingContent?.view_count || 1,
      };
      if (editingContent) {
        setContentList((prev) =>
          prev.map((c) => (c.id === editingContent.id ? fallbackEntry : c))
        );
      } else {
        setContentList((prev) => [fallbackEntry, ...prev]);
      }
      setShowContentForm(false);
      setEditingContent(null);
      onShowToast?.({
        title: editingContent ? 'Content Updated' : 'Content Added',
        message: `"${contentForm.title}" saved to catalog.`,
        type: 'success',
      });
    }
  };

  const handleDeleteContent = async (item) => {
    const lookup = item.slug || item.id;
    setContentList((prev) => prev.filter((c) => c.id !== item.id));
    try {
      await adminApi.deleteContent(lookup);
      loadAllAdminData();
    } catch {
      // ignore offline error
    }
    onShowToast?.({
      title: 'Content Removed',
      message: `"${item.title}" has been deleted from the catalog.`,
      type: 'warning',
    });
  };

  // ================= CHARACTERS, EVENTS & MERCH HANDLERS =================
  const handleSaveCharacter = async (e) => {
    e.preventDefault();
    const payload = {
      name: charForm.name,
      alias: charForm.alias,
      category_slug: charForm.category_slug,
      archetype: charForm.archetype,
      origin: charForm.origin,
      faction: charForm.faction,
      tagline: charForm.tagline,
      biography: charForm.biography,
      image_url: charForm.image_url,
      details_json: {
        weapon: charForm.weapon || 'Signature Relic',
        nemesis: charForm.nemesis || 'Unknown Rival',
        bio: charForm.biography,
      },
    };
    try {
      if (editingChar) {
        const updated = await adminApi.updateCharacter(editingChar.slug || editingChar.id, payload);
        setCharactersList((prev) =>
          prev.map((c) => (c.id === editingChar.id ? updated : c))
        );
      } else {
        const created = await adminApi.createCharacter(payload);
        setCharactersList((prev) => [created, ...prev]);
      }
      onShowToast?.({
        title: editingChar ? 'Character Profile Updated' : 'Character Profile Created',
        message: `"${charForm.name}" is now indexed in the Character Archive.`,
        type: 'success',
      });
    } catch {
      const localChar = { id: editingChar?.id || Date.now(), ...payload };
      setCharactersList((prev) =>
        editingChar
          ? prev.map((c) => (c.id === editingChar.id ? localChar : c))
          : [localChar, ...prev]
      );
      onShowToast?.({
        title: 'Character Saved',
        message: `"${charForm.name}" saved to roster.`,
        type: 'success',
      });
    }
    setShowCharForm(false);
    setEditingChar(null);
  };

  const handleDeleteCharacter = async (char) => {
    setCharactersList((prev) => prev.filter((c) => c.id !== char.id));
    try {
      await adminApi.deleteCharacter(char.slug || char.id);
    } catch {
      // ignore
    }
    onShowToast?.({
      title: 'Character Removed',
      message: `"${char.name}" removed from roster.`,
      type: 'warning',
    });
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        const updated = await adminApi.updateEvent(editingEvent.slug || editingEvent.id, eventForm);
        setEventsList((prev) =>
          prev.map((ev) => (ev.id === editingEvent.id ? updated : ev))
        );
      } else {
        const created = await adminApi.createEvent(eventForm);
        setEventsList((prev) => [created, ...prev]);
      }
      onShowToast?.({
        title: editingEvent ? 'Event Updated' : 'Event Highlight Created',
        message: `"${eventForm.title}" synced to Convention Radar.`,
        type: 'success',
      });
    } catch {
      const localEv = { id: editingEvent?.id || Date.now(), ...eventForm };
      setEventsList((prev) =>
        editingEvent
          ? prev.map((ev) => (ev.id === editingEvent.id ? localEv : ev))
          : [localEv, ...prev]
      );
      onShowToast?.({
        title: 'Event Highlight Saved',
        message: `"${eventForm.title}" saved.`,
        type: 'success',
      });
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (ev) => {
    setEventsList((prev) => prev.filter((x) => x.id !== ev.id));
    try {
      await adminApi.deleteEvent(ev.slug || ev.id);
    } catch {
      // ignore
    }
    onShowToast?.({
      title: 'Event Removed',
      message: `"${ev.title}" removed from Convention Radar.`,
      type: 'warning',
    });
  };

  const handleSaveMerch = async (e) => {
    e.preventDefault();
    try {
      if (editingMerch) {
        const updated = await adminApi.updateMerchandise(editingMerch.slug || editingMerch.id, merchForm);
        setMerchList((prev) =>
          prev.map((m) => (m.id === editingMerch.id ? updated : m))
        );
      } else {
        const created = await adminApi.createMerchandise(merchForm);
        setMerchList((prev) => [created, ...prev]);
      }
      onShowToast?.({
        title: editingMerch ? 'Merchandise Item Updated' : 'Merchandise Drop Added',
        message: `"${merchForm.name}" synced to Drop Radar.`,
        type: 'success',
      });
      loadAllAdminData();
    } catch {
      const localM = { id: editingMerch?.id || Date.now(), ...merchForm };
      setMerchList((prev) =>
        editingMerch
          ? prev.map((m) => (m.id === editingMerch.id ? localM : m))
          : [localM, ...prev]
      );
      onShowToast?.({
        title: 'Merchandise Saved',
        message: `"${merchForm.name}" saved.`,
        type: 'success',
      });
    }
    setShowMerchForm(false);
    setEditingMerch(null);
  };

  const handleDeleteMerch = async (item) => {
    setMerchList((prev) => prev.filter((m) => m.id !== item.id));
    try {
      await adminApi.deleteMerchandise(item.slug || item.id);
    } catch {
      // ignore
    }
    onShowToast?.({
      title: 'Merchandise Removed',
      message: `"${item.name}" removed from Drop Radar.`,
      type: 'warning',
    });
  };

  // ================= CHATBOT FAQ KNOWLEDGE BASE HANDLERS =================
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    const tagsArray = faqForm.tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      question: faqForm.question,
      answer: faqForm.answer,
      category_slug: faqForm.category_slug,
      universe_name: faqForm.universe_name,
      badge: faqForm.badge,
      tags: tagsArray,
      is_active: faqForm.is_active,
    };
    try {
      if (editingFaq) {
        const updated = await adminApi.updateFaq(editingFaq.id, payload);
        setFaqsList((prev) =>
          prev.map((f) => (f.id === editingFaq.id ? updated : f))
        );
      } else {
        const created = await adminApi.createFaq(payload);
        setFaqsList((prev) => [created, ...prev]);
      }
      onShowToast?.({
        title: editingFaq ? 'Chatbot FAQ Updated' : 'Chatbot FAQ Added',
        message: `Knowledge base updated for "${faqForm.question}".`,
        type: 'success',
      });
      loadAllAdminData();
    } catch {
      const localFaq = { id: editingFaq?.id || Date.now(), ...payload };
      setFaqsList((prev) =>
        editingFaq
          ? prev.map((f) => (f.id === editingFaq.id ? localFaq : f))
          : [localFaq, ...prev]
      );
      onShowToast?.({
        title: 'FAQ Entry Saved',
        message: `"${faqForm.question}" added to FandomBot Knowledge Base.`,
        type: 'success',
      });
    }
    setShowFaqForm(false);
    setEditingFaq(null);
  };

  const handleToggleFaqActive = async (faq) => {
    const nextState = !faq.is_active;
    setFaqsList((prev) =>
      prev.map((f) => (f.id === faq.id ? { ...f, is_active: nextState } : f))
    );
    try {
      await adminApi.updateFaq(faq.id, { is_active: nextState });
    } catch {
      // ignore
    }
    onShowToast?.({
      title: nextState ? 'FAQ Entry Activated' : 'FAQ Entry Paused',
      message: `"${faq.question}" is now ${nextState ? 'active' : 'inactive'}.`,
      type: 'info',
    });
  };

  const handleDeleteFaq = async (faq) => {
    setFaqsList((prev) => prev.filter((f) => f.id !== faq.id));
    try {
      await adminApi.deleteFaq(faq.id);
    } catch {
      // ignore
    }
    onShowToast?.({
      title: 'FAQ Entry Deleted',
      message: `"${faq.question}" removed from knowledge base.`,
      type: 'warning',
    });
  };

  // ================= MODERATION & FEEDBACK HANDLERS =================
  const handleModerateSubmission = async (sub, decision) => {
    const note = modFeedbackNotes[sub.id] || '';
    setModerationQueue((prev) =>
      prev.map((item) =>
        item.id === sub.id
          ? { ...item, status: decision, admin_feedback: note }
          : item
      )
    );
    try {
      await adminApi.moderateSubmission(sub.id, {
        status: decision,
        adminFeedback: note,
      });
      loadAllAdminData();
    } catch {
      // optimistic state kept
    }
    onShowToast?.({
      title: decision === 'APPROVED' ? 'Submission Approved & Published' : 'Submission Rejected',
      message:
        decision === 'APPROVED'
          ? `"${sub.title}" has been verified and auto-published to the Content catalog.`
          : `"${sub.title}" has been marked as rejected.`,
      type: decision === 'APPROVED' ? 'success' : 'warning',
    });
  };

  const handleUpdateFeedbackStatus = async (ticket, nextStatus) => {
    setFeedbackList((prev) =>
      prev.map((fb) => (fb.id === ticket.id ? { ...fb, status: nextStatus } : fb))
    );
    try {
      await adminApi.updateFeedbackStatus(ticket.id, nextStatus);
      loadAllAdminData();
    } catch {
      // optimistic state kept
    }
    onShowToast?.({
      title: 'Feedback Ticket Updated',
      message: `"${ticket.subject}" marked as ${nextStatus.replace('_', ' ')}.`,
      type: 'success',
    });
  };

  const handleDeleteFeedback = async (ticket) => {
    setFeedbackList((prev) => prev.filter((fb) => fb.id !== ticket.id));
    try {
      await adminApi.deleteFeedback(ticket.id);
    } catch {
      // ignore
    }
    onShowToast?.({
      title: 'Feedback Ticket Removed',
      message: `Ticket "${ticket.subject}" deleted.`,
      type: 'info',
    });
  };

  const filteredModerationItems = useMemo(() => {
    if (modStatusFilter === 'ALL') return moderationQueue;
    return moderationQueue.filter((m) => m.status === modStatusFilter);
  }, [moderationQueue, modStatusFilter]);

  const filteredFeedbackItems = useMemo(() => {
    return feedbackList.filter((fb) => {
      const matchType =
        feedbackTypeFilter === 'ALL' || fb.feedback_type === feedbackTypeFilter;
      const matchStatus =
        feedbackStatusFilter === 'ALL' || fb.status === feedbackStatusFilter;
      return matchType && matchStatus;
    });
  }, [feedbackList, feedbackTypeFilter, feedbackStatusFilter]);

  const ov = analytics?.overview || FALLBACK_ANALYTICS.overview;
  const popCats = analytics?.popular_categories || FALLBACK_ANALYTICS.popular_categories;
  const chatStats = analytics?.chatbot_metrics || FALLBACK_ANALYTICS.chatbot_metrics;
  const topContentMetrics =
    analytics?.content_metrics?.length > 0
      ? analytics.content_metrics
      : contentList;
  const topMerchMetrics =
    analytics?.merchandise_metrics?.length > 0
      ? analytics.merchandise_metrics
      : merchList;

  const maxCategoryViews = Math.max(
    1,
    ...popCats.map((c) => c.total_views || 1000)
  );

  const panelBody = (
    <div className="space-y-6">
      {/* Top Admin Control Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black dark:border-neutral-700">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'analytics', label: '1. Analytics & Telemetry', icon: BarChart3 },
            { id: 'content', label: '2. Content & Media (8 Fandoms)', icon: Layers },
            { id: 'entities', label: '3. Characters, Events & Merch', icon: Users },
            { id: 'chatbot', label: '4. AI Chatbot KB & FAQs', icon: Bot },
            {
              id: 'moderation',
              label: `5. Moderation & Feedback (${
                moderationQueue.filter((m) => m.status === 'PENDING').length +
                feedbackList.filter((f) => f.status !== 'RESOLVED').length
              })`,
              icon: ShieldCheck,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 font-mono text-[10px] sm:text-xs font-black uppercase border-2 border-black dark:border-white flex items-center gap-1.5 transition-all brutal-btn ${
                  isActive
                    ? 'bg-[#FACC15] text-black brutal-shadow-sm'
                    : 'bg-white dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={loadAllAdminData}
          disabled={isRefreshing}
          className="px-2.5 py-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white font-mono text-[10px] font-black uppercase brutal-shadow-sm brutal-btn flex items-center gap-1"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Sync Metrics</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: PLATFORM ANALYTICS & USAGE MONITORING
         ===================================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Cards: Active Users, Platform Engagement, Chatbot Volume, Views */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="font-mono text-[10px] font-black uppercase">
                  ACTIVE USERS
                </span>
                <Users className="w-4 h-4 text-[#A3E635]" />
              </div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-black dark:text-white block">
                {ov.active_users} / {ov.total_users}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#10B981]">
                ● {ov.verified_users} Verified ({ov.admin_users} Admins)
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="font-mono text-[10px] font-black uppercase">
                  PLATFORM ENGAGEMENT
                </span>
                <Activity className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-black dark:text-white block">
                {ov.total_engagement_actions?.toLocaleString()}
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-500">
                {ov.total_bookmarks} Bookmarks • {ov.total_ratings} Ratings
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="font-mono text-[10px] font-black uppercase">
                  CHATBOT INTERACTIONS
                </span>
                <Bot className="w-4 h-4 text-[#FACC15]" />
              </div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-black dark:text-white block">
                {chatStats.total_queries}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#FACC15]">
                {chatStats.faq_hit_rate_pct}% FAQ Hit • {chatStats.avg_latency_ms}ms Avg
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="font-mono text-[10px] font-black uppercase">
                  CONTENT & MERCH VIEWS
                </span>
                <Eye className="w-4 h-4 text-[#F43F5E]" />
              </div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-black dark:text-white block">
                {(ov.total_platform_views || 0).toLocaleString()}
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-500">
                {(ov.total_content_views || 0).toLocaleString()} Media •{' '}
                {(ov.total_merch_views || 0).toLocaleString()} Merch
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="font-mono text-[10px] font-black uppercase">
                  USER FEEDBACK
                </span>
                <MessageSquareWarning className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-black dark:text-white block">
                {ov.open_feedback || 0}
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-500">
                Open of {ov.total_feedback || 0} submitted tickets
              </span>
            </div>
          </div>

          {/* Most Popular Fandom Categories Metrics */}
          <div className="p-4 sm:p-5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/10 dark:border-neutral-800">
              <div>
                <h4 className="font-mono text-xs sm:text-sm font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#A3E635]" />
                  <span>MOST POPULAR FANDOM CATEGORIES (ENGAGEMENT & VIEW METRICS)</span>
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Ranked across all fandom universes by combined views, user favorites, bookmarks, and popularity score.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {popCats.map((cat, idx) => {
                const widthPct = Math.max(
                  12,
                  Math.min(100, Math.round(((cat.total_views || 1000) / maxCategoryViews) * 100))
                );
                return (
                  <div key={cat.slug || idx} className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-neutral-400">#{idx + 1}</span>
                        <span
                          className="px-2 py-0.5 text-[10px] font-black uppercase border border-black text-black"
                          style={{ backgroundColor: cat.accent_color || '#FACC15' }}
                        >
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-bold">
                          {(cat.total_views || 0).toLocaleString()} Views • {cat.favorites_count || 0} Favs • ★ {cat.avg_popularity_score || 4.8}
                        </span>
                      </div>
                      <span className="font-black text-black dark:text-white">
                        Score: {cat.engagement_score}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 border border-black overflow-hidden">
                      <div
                        className="h-full border-r border-black transition-all duration-300"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: cat.accent_color || '#A3E635',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Two-Column Leaderboards: Published Content vs Merchandise Popularity & Views */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Published Content View Counts & Popularity Scores */}
            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <h4 className="font-mono text-xs font-black uppercase text-black dark:text-white mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>PUBLISHED CONTENT VIEWS & POPULARITY SCORES</span>
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {topContentMetrics.slice(0, 8).map((item) => (
                  <div
                    key={item.id || item.slug}
                    className="p-2.5 bg-neutral-50 dark:bg-[#161B22] border border-black dark:border-neutral-700 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 bg-[#38BDF8] text-black border border-black">
                          {item.content_type}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                          {item.category_name || item.category?.name}
                        </span>
                      </div>
                      <p className="font-black text-xs text-black dark:text-white truncate mt-0.5">
                        {item.title}
                      </p>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <span className="text-xs font-black text-black dark:text-white block">
                        {(item.view_count || 0).toLocaleString()} views
                      </span>
                      <span className="text-[10px] font-bold text-[#FACC15] bg-black px-1.5 py-0.2">
                        ★ {item.popularity_score ?? 4.8} Pop
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Merchandise View Counts & Popularity Scores */}
            <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
              <h4 className="font-mono text-xs font-black uppercase text-black dark:text-white mb-3 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#F43F5E]" />
                <span>MERCHANDISE SHOWCASE VIEW COUNTS & POPULARITY</span>
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {topMerchMetrics.map((m) => (
                  <div
                    key={m.id || m.slug}
                    className="p-2.5 bg-neutral-50 dark:bg-[#161B22] border border-black dark:border-neutral-700 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 bg-[#F43F5E] text-white border border-black">
                          {m.tag_display || m.tag || 'COLLECTIBLE'}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                          {m.category_name || m.category?.name}
                        </span>
                      </div>
                      <p className="font-black text-xs text-black dark:text-white truncate mt-0.5">
                        {m.name}
                      </p>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {m.manufacturer} • {m.msrp}
                      </span>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <span className="text-xs font-black text-black dark:text-white block">
                        {(m.view_count || 0).toLocaleString()} views
                      </span>
                      <span className="text-[10px] font-bold text-[#A3E635] bg-black px-1.5 py-0.2">
                        ★ {m.popularity_score || roundMerchScore(m.view_count)} Score
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chatbot Interaction Volume & Recent Query Audit */}
          <div className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-mono text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-[#FACC15]" />
                <span>CHATBOT INTERACTION VOLUME & RECENT QUERY AUDIT</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold">
                <span className="px-2 py-0.5 bg-[#A3E635] text-black border border-black">
                  FAQ Hits: {chatStats.faq_hits} ({chatStats.faq_hit_rate_pct}%)
                </span>
                <span className="px-2 py-0.5 bg-[#38BDF8] text-black border border-black">
                  AI Fallbacks: {chatStats.fallback_queries}
                </span>
                <span className="px-2 py-0.5 bg-[#FACC15] text-black border border-black">
                  Avg Latency: {chatStats.avg_latency_ms}ms
                </span>
              </div>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {(chatStats.recent_queries || []).map((q) => (
                <div
                  key={q.id}
                  className="p-2 bg-neutral-50 dark:bg-[#161B22] border border-black/30 dark:border-neutral-700 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] font-black text-[#F43F5E] uppercase mr-2">
                      [{q.username || 'Guest'}]
                    </span>
                    <span className="font-bold text-black dark:text-white">
                      &ldquo;{q.message}&rdquo;
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                    <span
                      className={`px-1.5 py-0.2 border border-black font-bold ${
                        q.matched_faq || q.matched_faq_question
                          ? 'bg-[#A3E635] text-black'
                          : 'bg-neutral-200 text-black'
                      }`}
                    >
                      {q.matched_faq || q.matched_faq_question ? 'FAQ Match' : 'AI Synth'}
                    </span>
                    <span className="text-neutral-500">{q.latency_ms}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: CONTENT & MULTIMEDIA MANAGEMENT (ALL 8 FANDOM CATEGORIES)
         ===================================================================== */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-mono text-xs sm:text-sm font-black uppercase text-black dark:text-white">
                MANAGE CONTENT ACROSS ALL 8 FANDOM CATEGORIES
              </h4>
              <p className="text-xs text-neutral-500">
                Add, edit, and remove Featured Articles, Video Trailers, and Audio Soundtracks.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenNewContent}
              className="px-3.5 py-2 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add Content / Media</span>
            </button>
          </div>

          {/* 8 Fandom Category Filter Bar */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase border-2 border-black ${
                selectedCategoryFilter === 'all'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
              }`}
            >
              All 8 Categories
            </button>
            {EIGHT_FANDOM_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat.slug)}
                className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase border-2 border-black ${
                  selectedCategoryFilter === cat.slug
                    ? 'text-black brutal-shadow-sm'
                    : 'bg-white dark:bg-[#0D1117] text-neutral-600 dark:text-neutral-300'
                }`}
                style={
                  selectedCategoryFilter === cat.slug
                    ? { backgroundColor: cat.color }
                    : undefined
                }
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Type Filter & Search */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="flex flex-wrap gap-1">
              {['ALL', 'ARTICLE', 'VIDEO', 'AUDIO', 'IMAGE'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedTypeFilter(type)}
                  className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase border border-black ${
                    selectedTypeFilter === type
                      ? 'bg-[#38BDF8] text-black'
                      : 'bg-neutral-100 dark:bg-[#161B22] text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center border-2 border-black dark:border-neutral-600 bg-white dark:bg-[#0D1117] px-2.5 py-1">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-1.5" />
              <input
                type="text"
                value={contentSearch}
                onChange={(e) => setContentSearch(e.target.value)}
                placeholder="Search title or creator..."
                className="bg-transparent text-xs font-bold text-black dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Add / Edit Content Form Drawer */}
          {showContentForm && (
            <form
              onSubmit={handleSaveContent}
              className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-3 border-black dark:border-white space-y-3 brutal-shadow-md"
            >
              <div className="flex items-center justify-between border-b border-black/20 pb-2">
                <h5 className="font-mono text-xs font-black uppercase text-black dark:text-white">
                  {editingContent ? `Edit Content: ${editingContent.title}` : 'Add New Fandom Content / Multimedia Entry'}
                </h5>
                <button
                  type="button"
                  onClick={() => setShowContentForm(false)}
                  className="text-xs font-mono font-bold text-neutral-500"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={contentForm.title}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, title: e.target.value })
                    }
                    placeholder="e.g. Solo Leveling Season 2 Finale Breakdown"
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Fandom Category (8 Universes)
                  </label>
                  <select
                    value={contentForm.category_slug}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, category_slug: e.target.value })
                    }
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  >
                    {EIGHT_FANDOM_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Entry Type
                  </label>
                  <select
                    value={contentForm.content_type}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, content_type: e.target.value })
                    }
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  >
                    <option value="ARTICLE">Featured Article</option>
                    <option value="VIDEO">Video Trailer</option>
                    <option value="AUDIO">Audio Soundtrack</option>
                    <option value="IMAGE">Image Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Studio / Author
                  </label>
                  <input
                    type="text"
                    value={contentForm.artist_or_author}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, artist_or_author: e.target.value })
                    }
                    placeholder="e.g. Studio MAPPA"
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Duration / Read Time
                  </label>
                  <input
                    type="text"
                    value={contentForm.duration}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, duration: e.target.value })
                    }
                    placeholder="e.g. 02:45 or 6 min read"
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Popularity Score (0-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={contentForm.popularity_score}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        popularity_score: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Stream / Embed URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={contentForm.media_url}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, media_url: e.target.value })
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    value={contentForm.thumbnail_url}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, thumbnail_url: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                  Synopsis / Summary Blurb
                </label>
                <textarea
                  rows={2}
                  value={contentForm.synopsis}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, synopsis: e.target.value })
                  }
                  placeholder="Short preview blurb for cards and recommendations..."
                  className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                  Full Article Body / Lore Breakdown
                </label>
                <textarea
                  rows={3}
                  value={contentForm.body_text}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, body_text: e.target.value })
                  }
                  placeholder="Detailed article content or transcript..."
                  className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowContentForm(false)}
                  className="px-3 py-1.5 border-2 border-black bg-neutral-200 text-black font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 border-2 border-black bg-[#A3E635] text-black font-black text-xs uppercase brutal-shadow-sm"
                >
                  {editingContent ? 'Update Content Entry' : 'Publish Content'}
                </button>
              </div>
            </form>
          )}

          {/* Content List Table */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredContentItems.map((item) => (
              <div
                key={item.id || item.slug}
                className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 brutal-shadow-sm"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-black uppercase bg-[#FACC15] text-black border border-black">
                      {item.content_type}
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-black">
                      {item.category?.name || item.category_name || item.category_slug}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      • {(item.view_count || 0).toLocaleString()} views • ★ {item.popularity_score ?? 4.8}
                    </span>
                  </div>
                  <h5 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white mt-1 truncate">
                    {item.title}
                  </h5>
                  {item.synopsis && (
                    <p className="text-[11px] text-neutral-500 line-clamp-1">
                      {item.synopsis}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditContent(item)}
                    className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-neutral-100 dark:bg-[#161B22] text-black dark:text-white hover:bg-[#FACC15] hover:text-black flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteContent(item)}
                    className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: CHARACTER PROFILES, EVENT HIGHLIGHTS & MERCHANDISE
         ===================================================================== */}
      {activeTab === 'entities' && (
        <div className="space-y-4">
          {/* Sub-Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5">
              {[
                { id: 'characters', label: `Character Profiles (${charactersList.length})`, icon: Users },
                { id: 'events', label: `Event Highlights (${eventsList.length})`, icon: Calendar },
                { id: 'merch', label: `Merchandise Drops (${merchList.length})`, icon: ShoppingBag },
              ].map((st) => {
                const Icon = st.icon;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setEntitySubTab(st.id)}
                    className={`px-3 py-1.5 text-[10px] font-mono font-black uppercase border-2 border-black flex items-center gap-1.5 ${
                      entitySubTab === st.id
                        ? 'bg-[#A3E635] text-black'
                        : 'bg-white dark:bg-[#0D1117] text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>

            {entitySubTab === 'characters' && (
              <button
                type="button"
                onClick={() => {
                  setEditingChar(null);
                  setCharForm({
                    name: '',
                    alias: '',
                    category_slug: 'anime',
                    archetype: 'Protagonist',
                    origin: '',
                    faction: '',
                    tagline: '',
                    biography: '',
                    image_url: '',
                    weapon: '',
                    nemesis: '',
                  });
                  setShowCharForm(true);
                }}
                className="px-3 py-1.5 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Character Profile
              </button>
            )}

            {entitySubTab === 'events' && (
              <button
                type="button"
                onClick={() => {
                  setEditingEvent(null);
                  setEventForm({
                    title: '',
                    category_slug: 'anime',
                    city: 'Tokyo',
                    venue_name: '',
                    start_date: '2026-10-15',
                    date_month: 'OCT',
                    date_day: '15-17',
                    year: '2026',
                    latitude: 35.63,
                    longitude: 139.79,
                    attendees_info: '50,000+ Expected',
                    status: 'Registration Open',
                    description: '',
                  });
                  setShowEventForm(true);
                }}
                className="px-3 py-1.5 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Event Highlight
              </button>
            )}

            {entitySubTab === 'merch' && (
              <button
                type="button"
                onClick={() => {
                  setEditingMerch(null);
                  setMerchForm({
                    name: '',
                    category_slug: 'anime',
                    tag: 'LIMITED_EDITION',
                    msrp: '$150 MSRP (Preview)',
                    manufacturer: '',
                    drop_date_text: 'Nov 20, 2026 • 12:00 PM EST',
                    image_url: '',
                    description: '',
                    is_upcoming: true,
                    view_count: 1000,
                  });
                  setShowMerchForm(true);
                }}
                className="px-3 py-1.5 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Merchandise Item
              </button>
            )}
          </div>

          {/* 3A: CHARACTER PROFILES MANAGER */}
          {entitySubTab === 'characters' && (
            <div className="space-y-3">
              {showCharForm && (
                <form
                  onSubmit={handleSaveCharacter}
                  className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-3"
                >
                  <h5 className="font-mono text-xs font-black uppercase">
                    {editingChar ? `Edit Character: ${editingChar.name}` : 'Create Character Profile'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Character Name"
                      value={charForm.name}
                      onChange={(e) => setCharForm({ ...charForm, name: e.target.value })}
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Alias / Title (e.g. Titan Slayer)"
                      value={charForm.alias}
                      onChange={(e) => setCharForm({ ...charForm, alias: e.target.value })}
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <select
                      value={charForm.category_slug}
                      onChange={(e) =>
                        setCharForm({ ...charForm, category_slug: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    >
                      {EIGHT_FANDOM_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Origin Realm"
                      value={charForm.origin}
                      onChange={(e) => setCharForm({ ...charForm, origin: e.target.value })}
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Faction Affiliation"
                      value={charForm.faction}
                      onChange={(e) => setCharForm({ ...charForm, faction: e.target.value })}
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="url"
                      placeholder="Portrait Image URL"
                      value={charForm.image_url}
                      onChange={(e) =>
                        setCharForm({ ...charForm, image_url: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Character Biography & Canon Dossier..."
                    value={charForm.biography}
                    onChange={(e) =>
                      setCharForm({ ...charForm, biography: e.target.value })
                    }
                    className="w-full border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCharForm(false)}
                      className="px-3 py-1 border border-black text-xs font-bold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-[#A3E635] text-black border-2 border-black text-xs font-black uppercase"
                    >
                      Save Character
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {charactersList.map((char) => (
                  <div
                    key={char.id || char.slug}
                    className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#A3E635] bg-black px-1.5 py-0.2 uppercase">
                        {char.category?.name || char.category_slug || 'Universe'}
                      </span>
                      <h5 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white mt-0.5">
                        {char.name} {char.alias ? `(${char.alias})` : ''}
                      </h5>
                      <span className="text-[11px] text-neutral-500 block">
                        {char.faction || char.origin}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingChar(char);
                          setCharForm({
                            name: char.name || '',
                            alias: char.alias || '',
                            category_slug: char.category?.slug || 'anime',
                            archetype: char.archetype || '',
                            origin: char.origin || '',
                            faction: char.faction || '',
                            tagline: char.tagline || '',
                            biography: char.biography || '',
                            image_url: char.image_url || '',
                            weapon: char.details_json?.weapon || '',
                            nemesis: char.details_json?.nemesis || '',
                          });
                          setShowCharForm(true);
                        }}
                        className="p-1.5 border border-black bg-neutral-100 dark:bg-[#161B22]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCharacter(char)}
                        className="p-1.5 border border-black bg-red-100 text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3B: EVENT HIGHLIGHTS MANAGER */}
          {entitySubTab === 'events' && (
            <div className="space-y-3">
              {showEventForm && (
                <form
                  onSubmit={handleSaveEvent}
                  className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-3"
                >
                  <h5 className="font-mono text-xs font-black uppercase">
                    {editingEvent ? `Edit Event: ${editingEvent.title}` : 'Create Event Highlight'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Event Title"
                      value={eventForm.title}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Tokyo, London, Lagos)"
                      value={eventForm.city}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, city: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <select
                      value={eventForm.category_slug}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, category_slug: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    >
                      {EIGHT_FANDOM_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Venue Name"
                      value={eventForm.venue_name}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, venue_name: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="date"
                      required
                      value={eventForm.start_date}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, start_date: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Status (e.g. Registration Open)"
                      value={eventForm.status}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, status: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Event Highlight Description..."
                    value={eventForm.description}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, description: e.target.value })
                    }
                    className="w-full border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEventForm(false)}
                      className="px-3 py-1 border border-black text-xs font-bold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-[#A3E635] text-black border-2 border-black text-xs font-black uppercase"
                    >
                      Save Event
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {eventsList.map((ev) => (
                  <div
                    key={ev.id || ev.slug}
                    className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#C084FC] bg-black px-1.5 py-0.2 uppercase">
                        {ev.city} • {ev.date_month || ev.start_date}
                      </span>
                      <h5 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white mt-0.5">
                        {ev.title}
                      </h5>
                      <span className="text-[11px] text-neutral-500">
                        {ev.venue_name} • {ev.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEvent(ev);
                          setEventForm({
                            title: ev.title || '',
                            category_slug: ev.category?.slug || 'anime',
                            city: ev.city || '',
                            venue_name: ev.venue_name || '',
                            start_date: ev.start_date || '2026-10-15',
                            date_month: ev.date_month || 'OCT',
                            date_day: ev.date_day || '15-17',
                            year: ev.year || '2026',
                            latitude: ev.latitude || 35.63,
                            longitude: ev.longitude || 139.79,
                            attendees_info: ev.attendees_info || '',
                            status: ev.status || '',
                            description: ev.description || '',
                          });
                          setShowEventForm(true);
                        }}
                        className="p-1.5 border border-black bg-neutral-100 dark:bg-[#161B22]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(ev)}
                        className="p-1.5 border border-black bg-red-100 text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3C: MERCHANDISE SHOWCASE MANAGER */}
          {entitySubTab === 'merch' && (
            <div className="space-y-3">
              {showMerchForm && (
                <form
                  onSubmit={handleSaveMerch}
                  className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-3"
                >
                  <h5 className="font-mono text-xs font-black uppercase">
                    {editingMerch ? `Edit Merchandise: ${editingMerch.name}` : 'Add Merchandise Showcase Item'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Item Name"
                      value={merchForm.name}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, name: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <select
                      value={merchForm.category_slug}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, category_slug: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    >
                      {EIGHT_FANDOM_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={merchForm.tag}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, tag: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                    >
                      <option value="LIMITED_EDITION">Limited Edition</option>
                      <option value="PRE_ORDER">Pre-Order Soon</option>
                      <option value="COLLECTIBLE">Collectible</option>
                      <option value="OFFICIAL_LICENSED">Official Licensed</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Manufacturer"
                      value={merchForm.manufacturer}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, manufacturer: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="MSRP Display (e.g. $220 MSRP)"
                      value={merchForm.msrp}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, msrp: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Drop Date Text"
                      value={merchForm.drop_date_text}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, drop_date_text: e.target.value })
                      }
                      className="border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowMerchForm(false)}
                      className="px-3 py-1 border border-black text-xs font-bold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-[#A3E635] text-black border-2 border-black text-xs font-black uppercase"
                    >
                      Save Merchandise
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {merchList.map((m) => (
                  <div
                    key={m.id || m.slug}
                    className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-white bg-[#F43F5E] px-1.5 py-0.2 uppercase border border-black">
                        {m.tag_display || m.tag} • {(m.view_count || 0).toLocaleString()} views
                      </span>
                      <h5 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white mt-0.5">
                        {m.name}
                      </h5>
                      <span className="text-[11px] text-neutral-500">
                        {m.manufacturer} • {m.msrp} • {m.drop_date_text}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMerch(m);
                          setMerchForm({
                            name: m.name || '',
                            category_slug: m.category?.slug || 'anime',
                            tag: m.tag || 'LIMITED_EDITION',
                            msrp: m.msrp || '',
                            manufacturer: m.manufacturer || '',
                            drop_date_text: m.drop_date_text || '',
                            image_url: m.image_url || '',
                            description: m.description || '',
                            is_upcoming: m.is_upcoming ?? true,
                            view_count: m.view_count || 0,
                          });
                          setShowMerchForm(true);
                        }}
                        className="p-1.5 border border-black bg-neutral-100 dark:bg-[#161B22]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMerch(m)}
                        className="p-1.5 border border-black bg-red-100 text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 4: AI CHATBOT KNOWLEDGE BASE & FAQ MANAGEMENT
         ===================================================================== */}
      {activeTab === 'chatbot' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-mono text-xs sm:text-sm font-black uppercase text-black dark:text-white">
                AI CHATBOT KNOWLEDGE BASE & FAQ ENTRIES ({faqsList.length})
              </h4>
              <p className="text-xs text-neutral-500">
                Manage deterministic Q&A pairs, lore answers, and trigger tags used by FandomBot AI.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingFaq(null);
                setFaqForm({
                  question: '',
                  answer: '',
                  category_slug: 'anime',
                  universe_name: 'Anime',
                  badge: 'Anime Lore • Curated',
                  tagsText: 'anime, recommendation, lore',
                  is_active: true,
                });
                setShowFaqForm(true);
              }}
              className="px-3.5 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ Entry</span>
            </button>
          </div>

          {showFaqForm && (
            <form
              onSubmit={handleSaveFaq}
              className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-3 brutal-shadow-sm"
            >
              <h5 className="font-mono text-xs font-black uppercase">
                {editingFaq ? 'Update Chatbot Knowledge Base Entry' : 'New Chatbot FAQ Entry'}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Prompt / Question
                  </label>
                  <input
                    type="text"
                    required
                    value={faqForm.question}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, question: e.target.value })
                    }
                    placeholder="e.g. What is the watch order for Fate series?"
                    className="w-full border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Fandom Category
                  </label>
                  <select
                    value={faqForm.category_slug}
                    onChange={(e) => {
                      const cat = EIGHT_FANDOM_CATEGORIES.find(
                        (c) => c.slug === e.target.value
                      );
                      setFaqForm({
                        ...faqForm,
                        category_slug: e.target.value,
                        universe_name: cat?.name || 'Multiverse',
                        badge: `${cat?.name || 'Multiverse'} Lore • Verified`,
                      });
                    }}
                    className="w-full border-2 border-black p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
                  >
                    {EIGHT_FANDOM_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                  Curated AI Response
                </label>
                <textarea
                  rows={3}
                  required
                  value={faqForm.answer}
                  onChange={(e) =>
                    setFaqForm({ ...faqForm, answer: e.target.value })
                  }
                  placeholder="Enter verified canon answer..."
                  className="w-full border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Trigger Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={faqForm.tagsText}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, tagsText: e.target.value })
                    }
                    placeholder="fate, watch order, ufotable, anime"
                    className="w-full border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                    Response Badge Label
                  </label>
                  <input
                    type="text"
                    value={faqForm.badge}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, badge: e.target.value })
                    }
                    className="w-full border-2 border-black p-2 text-xs bg-white dark:bg-[#161B22] text-black dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFaqForm(false)}
                  className="px-3 py-1 border border-black text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-[#A3E635] text-black border-2 border-black text-xs font-black uppercase"
                >
                  Save FAQ Entry
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {faqsList.map((faq) => (
              <div
                key={faq.id}
                className="p-3.5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-2 brutal-shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[9px] font-mono font-black uppercase bg-[#FACC15] text-black border border-black">
                        {faq.universe_name || faq.category?.name || 'Multiverse'}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-neutral-500">
                        {faq.badge}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 text-[9px] font-mono font-black uppercase border border-black ${
                          faq.is_active
                            ? 'bg-[#A3E635] text-black'
                            : 'bg-neutral-300 text-neutral-700'
                        }`}
                      >
                        {faq.is_active ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <h5 className="font-black text-xs sm:text-sm text-black dark:text-white mt-1">
                      Q: {faq.question}
                    </h5>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleFaqActive(faq)}
                      className="px-2 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-neutral-100 dark:bg-[#161B22]"
                    >
                      {faq.is_active ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaq(faq);
                        setFaqForm({
                          question: faq.question || '',
                          answer: faq.answer || '',
                          category_slug: faq.category?.slug || 'anime',
                          universe_name: faq.universe_name || 'Anime',
                          badge: faq.badge || 'Curated FAQ',
                          tagsText: Array.isArray(faq.tags) ? faq.tags.join(', ') : '',
                          is_active: faq.is_active ?? true,
                        });
                        setShowFaqForm(true);
                      }}
                      className="p-1.5 border border-black bg-neutral-100 dark:bg-[#161B22]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq)}
                      className="p-1.5 border border-black bg-red-100 text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-line bg-neutral-50 dark:bg-[#161B22] p-2.5 border border-black/20">
                  {faq.answer}
                </p>

                {Array.isArray(faq.tags) && faq.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {faq.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: MODERATION & FEEDBACK HANDLING
         ===================================================================== */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          {/* PART A: FAN-SUBMITTED ARTICLES & CONTENT MODERATION */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b-2 border-black dark:border-neutral-700">
              <div>
                <h4 className="font-mono text-xs sm:text-sm font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A3E635]" />
                  <span>FAN-SUBMITTED ARTICLES & CONTENT MODERATION QUEUE</span>
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Review, moderate, and approve (auto-publishes to Content catalog) or reject fan submissions.
                </p>
              </div>

              <div className="flex gap-1">
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setModStatusFilter(st)}
                    className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase border border-black ${
                      modStatusFilter === st
                        ? 'bg-[#FACC15] text-black'
                        : 'bg-white dark:bg-[#0D1117] text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredModerationItems.length === 0 ? (
              <div className="p-5 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black text-center text-xs font-bold text-neutral-500">
                No fan submissions matching filter &ldquo;{modStatusFilter}&rdquo;.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredModerationItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-[#FACC15] text-black border border-black">
                            {item.category_details?.name || 'Fandom Lore'}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-neutral-500">
                            by {item.user_username || 'Collector'}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                              item.status === 'APPROVED'
                                ? 'bg-[#A3E635] text-black'
                                : item.status === 'REJECTED'
                                  ? 'bg-[#F43F5E] text-white'
                                  : 'bg-amber-200 text-black'
                            }`}
                          >
                            ● {item.status}
                          </span>
                        </div>
                        <h5 className="font-black text-sm uppercase text-black dark:text-white mt-1">
                          {item.title}
                        </h5>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleModerateSubmission(item, 'APPROVED')}
                          className="px-3 py-1.5 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve & Publish
                        </button>
                        <button
                          type="button"
                          onClick={() => handleModerateSubmission(item, 'REJECTED')}
                          className="px-3 py-1.5 bg-[#F43F5E] text-white font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    </div>

                    {item.body && (
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-[#161B22] p-2.5 border border-black/20">
                        {item.body}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={
                          modFeedbackNotes[item.id] !== undefined
                            ? modFeedbackNotes[item.id]
                            : item.admin_feedback || ''
                        }
                        onChange={(e) =>
                          setModFeedbackNotes({
                            ...modFeedbackNotes,
                            [item.id]: e.target.value,
                          })
                        }
                        placeholder="Optional moderator note or rejection reason..."
                        className="flex-1 border border-black dark:border-neutral-600 px-2.5 py-1 text-xs bg-neutral-50 dark:bg-[#161B22] text-black dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PART B: INCOMING USER FEEDBACK & RESOLUTION TRACKER (BUGS, SUGGESTIONS, QUERIES) */}
          <div className="space-y-3 pt-4 border-t-2 border-black dark:border-neutral-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div>
                <h4 className="font-mono text-xs sm:text-sm font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                  <MessageSquareWarning className="w-4 h-4 text-[#38BDF8]" />
                  <span>USER FEEDBACK & RESOLUTION TRACKER (BUGS, SUGGESTIONS, QUERIES)</span>
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Categorized incoming feedback tickets with real-time resolution status tracking.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {/* Filter by Category Type */}
                {[
                  { id: 'ALL', label: 'All Types' },
                  { id: 'BUG', label: '🐛 Bugs' },
                  { id: 'SUGGESTION', label: '💡 Suggestions' },
                  { id: 'INQUIRY', label: '❓ Queries' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFeedbackTypeFilter(t.id)}
                    className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                      feedbackTypeFilter === t.id
                        ? 'bg-[#38BDF8] text-black'
                        : 'bg-white dark:bg-[#0D1117] text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}

                {/* Filter by Resolution Status */}
                {['ALL', 'NEW', 'IN_REVIEW', 'RESOLVED'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFeedbackStatusFilter(st)}
                    className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                      feedbackStatusFilter === st
                        ? 'bg-[#FACC15] text-black'
                        : 'bg-neutral-100 dark:bg-[#161B22] text-neutral-500'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {filteredFeedbackItems.length === 0 ? (
              <div className="p-5 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black text-center text-xs font-bold text-neutral-500">
                No feedback tickets match the selected filters.
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredFeedbackItems.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-3.5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase border border-black ${
                            fb.feedback_type === 'BUG'
                              ? 'bg-[#F43F5E] text-white'
                              : fb.feedback_type === 'SUGGESTION'
                                ? 'bg-[#FACC15] text-black'
                                : 'bg-[#38BDF8] text-black'
                          }`}
                        >
                          {fb.feedback_type === 'INQUIRY' ? 'QUERY / INQUIRY' : fb.feedback_type}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase border border-black ${
                            fb.status === 'RESOLVED'
                              ? 'bg-[#A3E635] text-black'
                              : fb.status === 'IN_REVIEW'
                                ? 'bg-amber-300 text-black'
                                : 'bg-neutral-200 text-black'
                          }`}
                        >
                          STATUS: {fb.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          • {fb.name || 'Collector'} ({fb.email})
                        </span>
                      </div>
                      <h5 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white">
                        {fb.subject}
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300">
                        {fb.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {fb.status !== 'IN_REVIEW' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(fb, 'IN_REVIEW')}
                          className="px-2.5 py-1 text-[10px] font-mono font-black uppercase border border-black bg-[#FACC15] text-black"
                        >
                          In Review
                        </button>
                      )}
                      {fb.status !== 'RESOLVED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(fb, 'RESOLVED')}
                          className="px-2.5 py-1 text-[10px] font-mono font-black uppercase border border-black bg-[#A3E635] text-black flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Resolve
                        </button>
                      )}
                      {fb.status === 'RESOLVED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(fb, 'NEW')}
                          className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-neutral-200 text-black"
                        >
                          Reopen
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteFeedback(fb)}
                        className="p-1.5 border border-black bg-red-100 text-red-700"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return panelBody;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-40 w-full bg-[#F43F5E] text-white border-b-3 border-black transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] font-black uppercase bg-black text-[#FACC15] px-2 py-0.5">
              ADMINISTRATOR COMMAND CENTER
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              Fan Hub Plus • Admin Control Panel
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-white text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm"
              >
                Back to Hub
              </button>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#FACC15] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto flex-1 p-6">{panelBody}</main>
    </div>
  );
}

function roundMerchScore(views = 0) {
  return Math.min(5.0, +(3.5 + views / 3000).toFixed(2));
}