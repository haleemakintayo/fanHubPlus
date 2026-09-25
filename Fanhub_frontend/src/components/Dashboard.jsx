import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { interactionsApi } from '../services/api';
import {
  Bookmark,
  Sparkles,
  FileText,
  User,
  Save,
  LogOut,
  RefreshCw,
  Activity,
  Sliders,
  StickyNote,
  Edit3,
  Trash2,
  Check,
  X,
  Compass,
  ShieldAlert,
  Camera,
  Eye,
  Star,
  Film,
  Users,
  ShoppingBag,
  Clock,
} from 'lucide-react';

const ALL_FANDOM_CATEGORIES = [
  { slug: 'anime', name: 'Anime', accent_color: '#A3E635', icon: '🍙', top_pick: 'Solo Leveling: Arise' },
  { slug: 'gaming', name: 'Gaming', accent_color: '#FACC15', icon: '🎮', top_pick: 'Elden Ring: Nightreign' },
  { slug: 'movies-tv', name: 'Movies', accent_color: '#38BDF8', icon: '🎬', top_pick: 'Avengers: Secret Wars' },
  { slug: 'tv-shows', name: 'TV Shows', accent_color: '#60A5FA', icon: '📺', top_pick: 'Stranger Things Finale' },
  { slug: 'kpop', name: 'K-Pop', accent_color: '#F43F5E', icon: '🎤', top_pick: 'NewJeans Global Tour' },
  { slug: 'comics', name: 'Comics', accent_color: '#FB7185', icon: '💥', top_pick: 'Ultimate Spider-Man' },
  { slug: 'manga', name: 'Manga', accent_color: '#FB923C', icon: '📖', top_pick: 'Berserk Continuation' },
  { slug: 'cosplay', name: 'Cosplay', accent_color: '#C084FC', icon: '🎭', top_pick: 'WCS Champion Armor' },
];

const PRESET_AVATARS = [
  {
    label: 'Anime Vanguard',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
  },
  {
    label: 'Cyber Merc',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=300&q=80',
  },
  {
    label: 'Comic Vigilante',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
  },
  {
    label: 'Astral Cosplayer',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
  },
  {
    label: 'K-Wave Producer',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
  },
];

const DEFAULT_WIDGET_PREFS = {
  layoutMode: 'grid', // 'grid' | 'compact'
  showStats: true,
  showFavorites: true,
  showBookmarks: true,
  showActivity: true,
  showSubmissions: true,
  showRecommendations: true,
};

function categorizeBookmarkType(rawType = '') {
  const upper = String(rawType).toUpperCase();
  if (upper.includes('CHAR')) return 'CHARACTER';
  if (upper.includes('VID') || upper.includes('TRAILER') || upper.includes('AUD') || upper.includes('TRACK')) {
    return 'VIDEO';
  }
  if (upper.includes('MERCH') || upper.includes('DROP') || upper.includes('COLLECT')) {
    return 'MERCHANDISE';
  }
  return 'ARTICLE';
}

function getGreetingByHour() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function Dashboard({
  embedded = false,
  bookmarkedItems = {},
  toggleBookmark,
  onUpdateBookmarkNote,
  recentActivities = [],
  onClearActivities,
  onSelectUniverse,
  onApplyDisplayPreferences,
  onOpenAdmin,
  onShowToast,
  onClose,
}) {
  const {
    user,
    dashboard,
    isAuthenticated,
    isLoading,
    fetchDashboard,
    updateProfile,
    logout,
  } = useAuth();

  // Profile & Display Preferences State
  const initialProfile = dashboard?.profile || user?.profile;
  const [bio, setBio] = useState(() => initialProfile?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(() => initialProfile?.avatar || '');
  const [themePref, setThemePref] = useState(() => initialProfile?.theme_preference || 'LIGHT');
  const [fontPref, setFontPref] = useState(() => initialProfile?.font_size_preference || 'NORMAL');
  const [selectedFavSlugs, setSelectedFavSlugs] = useState(() =>
    Array.isArray(initialProfile?.favorite_categories) && initialProfile.favorite_categories.length > 0
      ? initialProfile.favorite_categories.map((c) => c.slug || String(c).toLowerCase())
      : ['anime', 'gaming', 'comics']
  );
  const [editingProfile, setEditingProfile] = useState(false);

  // Dashboard Customization State
  const [customizingHub, setCustomizingHub] = useState(false);
  const [widgetPrefs, setWidgetPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('fanhub_dashboard_prefs');
      return saved ? { ...DEFAULT_WIDGET_PREFS, ...JSON.parse(saved) } : DEFAULT_WIDGET_PREFS;
    } catch {
      return DEFAULT_WIDGET_PREFS;
    }
  });

  // Bookmarks Filter & Inline Note Editor State
  const [bookmarkFilter, setBookmarkFilter] = useState('ALL'); // 'ALL' | 'ARTICLE' | 'CHARACTER' | 'VIDEO' | 'MERCHANDISE'
  const [editingNoteKey, setEditingNoteKey] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // Activity Stream Filter State
  const [activityFilter, setActivityFilter] = useState('ALL'); // 'ALL' | 'VIEW' | 'BOOKMARK' | 'INTERACTION'

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboard()
        .then((data) => {
          const profileSource = data?.profile;
          if (profileSource) {
            setBio(profileSource.bio || '');
            setAvatarUrl(profileSource.avatar || '');
            setThemePref(profileSource.theme_preference || 'LIGHT');
            setFontPref(profileSource.font_size_preference || 'NORMAL');

            if (
              Array.isArray(profileSource.favorite_categories) &&
              profileSource.favorite_categories.length > 0
            ) {
              setSelectedFavSlugs(
                profileSource.favorite_categories.map((c) => c.slug || String(c).toLowerCase())
              );
            }

            if (
              profileSource.dashboard_preferences &&
              Object.keys(profileSource.dashboard_preferences).length > 0
            ) {
              setWidgetPrefs((prev) => ({ ...prev, ...profileSource.dashboard_preferences }));
            }
          }
        })
        .catch(() => {
          // fallback to local state if backend is unreachable
        });
    }
  }, [isAuthenticated, fetchDashboard]);

  const handleToggleWidgetPref = async (key, value) => {
    const updated = { ...widgetPrefs, [key]: value };
    setWidgetPrefs(updated);
    try {
      localStorage.setItem('fanhub_dashboard_prefs', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    if (isAuthenticated) {
      try {
        await updateProfile({ dashboard_preferences: updated });
      } catch {
        // silent fallback
      }
    }
  };

  const handleToggleFavCategory = (slug) => {
    setSelectedFavSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    // Apply display preferences immediately to the live portal
    onApplyDisplayPreferences?.({
      darkMode: themePref === 'DARK',
      fontScale: fontPref === 'LARGE' ? 'large' : 'normal',
    });

    try {
      if (isAuthenticated) {
        await updateProfile({
          bio,
          avatar: avatarUrl || null,
          theme_preference: themePref,
          font_size_preference: fontPref,
          favorite_categories_input: selectedFavSlugs,
          dashboard_preferences: widgetPrefs,
        });
        await fetchDashboard();
      }
      setEditingProfile(false);
      onShowToast?.({
        title: 'Profile & Display Preferences Saved',
        message: 'Your avatar, favorite fandoms, and display settings have been updated.',
        type: 'success',
      });
    } catch (err) {
      setEditingProfile(false);
      onShowToast?.({
        title: 'Preferences Applied Locally',
        message: err.message || 'Saved display preferences to your current session.',
        type: 'info',
      });
    }
  };

  // Merge server bookmarks and local bookmarks without duplicates
  const mergedBookmarks = useMemo(() => {
    const map = new Map();

    // 1. Server bookmarks
    (dashboard?.bookmarks || []).forEach((b) => {
      const key = b.external_id || b.content_slug || `srv-${b.id}`;
      const localMatch = bookmarkedItems[key];
      map.set(key, {
        key,
        bookmarkId: b.id,
        contentId: b.content_id,
        title: b.content_title || localMatch?.title || key,
        rawType: b.content_type || localMatch?.type || 'Article',
        categoryType: categorizeBookmarkType(b.content_type || localMatch?.type),
        categoryName: b.category_name || localMatch?.category || 'Multiverse',
        thumbnailUrl: b.thumbnail_url || localMatch?.image || null,
        note: localMatch?.note !== undefined ? localMatch.note : (b.note || ''),
        date: b.created_at ? new Date(b.created_at).toLocaleDateString() : 'Saved',
        source: 'server',
      });
    });

    // 2. Local bookmarks
    Object.entries(bookmarkedItems).forEach(([id, item]) => {
      if (!map.has(id)) {
        map.set(id, {
          key: id,
          bookmarkId: item.bookmarkId || null,
          contentId: item.contentId || null,
          title: item.title,
          rawType: item.type || 'Fandom Entry',
          categoryType: categorizeBookmarkType(item.type),
          categoryName: item.category || 'Multiverse',
          thumbnailUrl: item.image || null,
          note: item.note || '',
          date: item.date || 'Just now',
          source: 'local',
        });
      }
    });

    return Array.from(map.values());
  }, [dashboard?.bookmarks, bookmarkedItems]);

  const filteredBookmarks = useMemo(() => {
    if (bookmarkFilter === 'ALL') return mergedBookmarks;
    return mergedBookmarks.filter((item) => item.categoryType === bookmarkFilter);
  }, [mergedBookmarks, bookmarkFilter]);

  const handleStartEditNote = (item) => {
    setEditingNoteKey(item.key);
    setNoteDraft(item.note || '');
  };

  const handleSaveBookmarkNote = async (item) => {
    setSavingNote(true);
    const trimmedNote = noteDraft.trim();
    try {
      // Update local state immediately
      onUpdateBookmarkNote?.(item.key, trimmedNote, item);

      if (isAuthenticated) {
        await interactionsApi.updateBookmarkNote({
          bookmark_id: item.bookmarkId,
          content_id: item.contentId,
          external_id: item.key,
          item_title: item.title,
          item_type: item.categoryType,
          category_name: item.categoryName,
          note: trimmedNote,
        });
        await fetchDashboard();
      }

      setEditingNoteKey(null);
      onShowToast?.({
        title: 'Personal Note Saved',
        message: trimmedNote
          ? `Note attached to "${item.title}".`
          : `Note cleared for "${item.title}".`,
        type: 'success',
      });
    } catch {
      setEditingNoteKey(null);
      onShowToast?.({
        title: 'Note Saved to Local Vault',
        message: `Personal note saved for "${item.title}".`,
        type: 'info',
      });
    } finally {
      setSavingNote(false);
    }
  };

  const handleRemoveBookmark = async (item) => {
    if (bookmarkedItems[item.key] && toggleBookmark) {
      toggleBookmark(item.key, item.title, item.rawType);
    }
    if (isAuthenticated && item.bookmarkId) {
      try {
        await interactionsApi.deleteBookmark(item.bookmarkId);
        await fetchDashboard();
      } catch {
        // ignore
      }
    }
  };

  // Unified Recent Activity Stream (combining client-tracked browsing + backend activity stream)
  const combinedActivities = useMemo(() => {
    const serverActs = (dashboard?.recent_activity || []).map((act) => ({
      id: act.id,
      actionType: act.action_type || 'VIEW',
      actionLabel: act.action_label || 'Platform Activity',
      targetType: act.target_type || 'Entry',
      targetTitle: act.target_title,
      categoryName: act.category_name || 'Multiverse',
      detail: act.detail || '',
      timestamp: act.created_at
        ? new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Recent',
    }));

    const localActs = (recentActivities || []).map((act) => ({
      id: act.id,
      actionType: act.actionType || 'VIEW',
      actionLabel: act.actionLabel || 'Viewed Item',
      targetType: act.targetType || 'Entry',
      targetTitle: act.targetTitle,
      categoryName: act.categoryName || 'Multiverse',
      detail: act.detail || '',
      timestamp: act.timestamp || 'Just now',
    }));

    const seen = new Set();
    const merged = [];
    for (const item of [...localActs, ...serverActs]) {
      const dedupeKey = `${item.actionType}-${item.targetTitle}`;
      if (!seen.has(dedupeKey)) {
        seen.add(dedupeKey);
        merged.push(item);
      }
    }
    return merged.slice(0, 20);
  }, [dashboard?.recent_activity, recentActivities]);

  const filteredActivities = useMemo(() => {
    if (activityFilter === 'ALL') return combinedActivities;
    if (activityFilter === 'VIEW') {
      return combinedActivities.filter((a) => ['VIEW', 'FILTER'].includes(a.actionType));
    }
    if (activityFilter === 'BOOKMARK') {
      return combinedActivities.filter((a) => ['BOOKMARK', 'NOTE'].includes(a.actionType));
    }
    return combinedActivities.filter((a) =>
      ['RATING', 'SUBMISSION', 'CHATBOT', 'PROFILE'].includes(a.actionType)
    );
  }, [combinedActivities, activityFilter]);

  const handleClearActivityStream = async () => {
    onClearActivities?.();
    if (isAuthenticated) {
      try {
        await interactionsApi.clearActivities();
        await fetchDashboard();
      } catch {
        // ignore
      }
    }
    onShowToast?.({
      title: 'Activity Stream Cleared',
      message: 'Your recent browsing and interaction log has been reset.',
      type: 'info',
    });
  };

  // Resolve Favorite Fandoms Display objects
  const resolvedFavoriteFandoms = useMemo(() => {
    const serverFavs = dashboard?.profile?.favorite_categories || user?.profile?.favorite_categories || [];
    if (serverFavs.length > 0 && !editingProfile) {
      return serverFavs.map((cat) => {
        const match = ALL_FANDOM_CATEGORIES.find((c) => c.slug === cat.slug);
        return {
          slug: cat.slug,
          name: cat.name,
          accent_color: cat.accent_color || match?.accent_color || '#FACC15',
          icon: match?.icon || '✨',
          top_pick: cat.top_pick || match?.top_pick || 'Curated Sector',
        };
      });
    }
    return ALL_FANDOM_CATEGORIES.filter((c) => selectedFavSlugs.includes(c.slug));
  }, [dashboard?.profile?.favorite_categories, user?.profile?.favorite_categories, selectedFavSlugs, editingProfile]);

  const notesSavedCount = mergedBookmarks.filter((b) => b.note && b.note.trim().length > 0).length;
  const submissionsCount = dashboard?.stats?.submissions_count || 0;
  const ratingsCount = dashboard?.stats?.ratings_count || 0;
  const recommendations = dashboard?.personalized_recommendations || [];
  const recentSubmissions = dashboard?.recent_submissions || [];

  const displayUsername = user?.username || dashboard?.user?.username || 'Collector';
  const greetingTime = getGreetingByHour();
  const isCompact = widgetPrefs.layoutMode === 'compact';

  const content = (
    <div className={isCompact ? 'space-y-4' : 'space-y-6'}>
      {/* ================= 1. PERSONALIZED GREETING BANNER ================= */}
      <div className="p-4 sm:p-5 bg-neutral-100 dark:bg-[#0D1117] border-3 border-black dark:border-white brutal-shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#A3E635] border-b border-black" />

        <div className="flex items-start sm:items-center gap-3.5 pt-1">
          {/* Profile Avatar or Stylized Monogram */}
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayUsername}
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-black bg-neutral-900 brutal-shadow-sm"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FACC15] text-black border-2 border-black flex items-center justify-center font-black text-2xl uppercase brutal-shadow-sm">
                {displayUsername[0]}
              </div>
            )}
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] border-2 border-black"
              title="Telemetry Online"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-[#FACC15] text-black border border-black">
                {greetingTime}, {displayUsername}!
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-black uppercase bg-[#A3E635] text-black border border-black">
                {user?.role || 'REGISTERED MEMBER'}
              </span>
              {user?.is_verified && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#38BDF8] text-black border border-black">
                  ✓ Verified
                </span>
              )}
            </div>

            <h4 className="font-black text-base sm:text-xl uppercase tracking-tight text-black dark:text-white mt-1">
              {dashboard?.greeting?.headline || `Welcome back to your Hub, ${displayUsername}!`}
            </h4>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium mt-0.5 max-w-xl">
              {bio ||
                dashboard?.greeting?.subheadline ||
                'Your personalized fandom feed, bookmarked vault items with personal notes, and live activity telemetry.'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0">
          {user?.role === 'ADMIN' && onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 text-[10px] font-mono font-black uppercase border-2 border-black bg-[#F43F5E] text-white brutal-shadow-sm brutal-btn flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setEditingProfile((prev) => !prev);
              setCustomizingHub(false);
            }}
            className={`px-2.5 py-1.5 text-[10px] font-mono font-black uppercase border-2 border-black dark:border-neutral-300 brutal-shadow-sm brutal-btn flex items-center gap-1 ${
              editingProfile
                ? 'bg-[#FACC15] text-black'
                : 'bg-white dark:bg-[#161B22] text-black dark:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{editingProfile ? 'Close Profile' : 'Profile & Prefs'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCustomizingHub((prev) => !prev);
              setEditingProfile(false);
            }}
            className={`px-2.5 py-1.5 text-[10px] font-mono font-black uppercase border-2 border-black dark:border-neutral-300 brutal-shadow-sm brutal-btn flex items-center gap-1 ${
              customizingHub
                ? 'bg-[#38BDF8] text-black'
                : 'bg-white dark:bg-[#161B22] text-black dark:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Hub</span>
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => fetchDashboard()}
              disabled={isLoading}
              className="p-1.5 border-2 border-black dark:border-neutral-300 bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm brutal-btn"
              title="Sync Dashboard Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* ================= 2. DASHBOARD CUSTOMIZER DRAWER ================= */}
      {customizingHub && (
        <div className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-3 brutal-shadow-sm">
          <div className="flex items-center justify-between border-b border-black/20 dark:border-neutral-700 pb-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#38BDF8]" />
              <h5 className="font-mono text-xs font-black uppercase text-black dark:text-white">
                Customize Dashboard Layout & Active Modules
              </h5>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleToggleWidgetPref('layoutMode', 'grid')}
                className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                  widgetPrefs.layoutMode === 'grid'
                    ? 'bg-[#FACC15] text-black'
                    : 'bg-white dark:bg-neutral-800 text-neutral-500'
                }`}
              >
                Spacious Grid
              </button>
              <button
                type="button"
                onClick={() => handleToggleWidgetPref('layoutMode', 'compact')}
                className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                  widgetPrefs.layoutMode === 'compact'
                    ? 'bg-[#FACC15] text-black'
                    : 'bg-white dark:bg-neutral-800 text-neutral-500'
                }`}
              >
                Compact Density
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { key: 'showStats', label: 'Telemetry Counters' },
              { key: 'showFavorites', label: 'Favorite Fandoms' },
              { key: 'showBookmarks', label: 'Bookmarked Vault & Notes' },
              { key: 'showActivity', label: 'Recent Activity Stream' },
              { key: 'showSubmissions', label: 'Fan Submissions' },
              { key: 'showRecommendations', label: 'Radar Recommendations' },
            ].map((mod) => (
              <label
                key={mod.key}
                className="flex items-center gap-2 p-2 border border-black dark:border-neutral-700 bg-white dark:bg-[#161B22] cursor-pointer text-xs font-bold"
              >
                <input
                  type="checkbox"
                  checked={Boolean(widgetPrefs[mod.key])}
                  onChange={(e) => handleToggleWidgetPref(mod.key, e.target.checked)}
                  className="accent-[#A3E635] w-3.5 h-3.5"
                />
                <span className="text-black dark:text-white text-[11px] font-mono uppercase">
                  {mod.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. PROFILE & DISPLAY PREFERENCES EDITOR ================= */}
      {editingProfile && (
        <form
          onSubmit={handleSaveProfile}
          className="p-4 sm:p-5 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-4 brutal-shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-black/20 dark:border-neutral-700 pb-2">
            <h5 className="font-mono text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#FACC15]" />
              <span>Profile Avatar, Categories of Interest & Display Preferences</span>
            </h5>
            <button
              type="button"
              onClick={() => setEditingProfile(false)}
              className="text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Optional Profile Picture / Avatar Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono font-black uppercase text-neutral-500">
              Optional Profile Picture / Avatar URL or Preset
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 border-2 border-black dark:border-neutral-600 p-2 text-xs font-medium bg-white dark:bg-[#161B22] text-black dark:text-white focus:outline-none"
              />
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl('')}
                  className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase border-2 border-black bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white"
                >
                  Clear Avatar
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                Quick Avatars:
              </span>
              {PRESET_AVATARS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setAvatarUrl(preset.url)}
                  className={`flex items-center gap-1.5 px-2 py-1 border text-[10px] font-mono font-bold uppercase ${
                    avatarUrl === preset.url
                      ? 'border-black bg-[#FACC15] text-black font-black'
                      : 'border-neutral-400 bg-white dark:bg-[#161B22] text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-4 h-4 object-cover border border-black"
                  />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collector Bio */}
          <div>
            <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
              Collector Bio & Manifesto
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share your favorite universes, main characters, or cosplay builds..."
              className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-medium bg-white dark:bg-[#161B22] text-black dark:text-white focus:outline-none"
            />
          </div>

          {/* Editable Categories of Interest (8 Fandoms) */}
          <div>
            <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1.5">
              Categories of Interest (Select Favorite Fandoms)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_FANDOM_CATEGORIES.map((cat) => {
                const isSelected = selectedFavSlugs.includes(cat.slug);
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleToggleFavCategory(cat.slug)}
                    className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase border-2 border-black transition-all ${
                      isSelected
                        ? 'text-black brutal-shadow-sm'
                        : 'bg-white dark:bg-[#161B22] text-neutral-500 dark:text-neutral-400 opacity-75'
                    }`}
                    style={isSelected ? { backgroundColor: cat.accent_color } : undefined}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {cat.icon} {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                Theme Display Preference
              </label>
              <select
                value={themePref}
                onChange={(e) => setThemePref(e.target.value)}
                className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
              >
                <option value="LIGHT">☀️ Light Mode (Pop-Brutalist Canvas)</option>
                <option value="DARK">🌙 Dark Mode (Obsidian Cyber)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                Accessibility Font Scale
              </label>
              <select
                value={fontPref}
                onChange={(e) => setFontPref(e.target.value)}
                className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
              >
                <option value="NORMAL">Standard Text Scale (16px)</option>
                <option value="LARGE">Large Accessibility Scale (18.5px)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setEditingProfile(false)}
              className="px-3 py-2 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white font-bold text-xs uppercase border-2 border-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Saving...' : 'Save Profile & Sync Preferences'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= 4. TELEMETRY STATS BAR ================= */}
      {widgetPrefs.showStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center brutal-shadow-sm">
            <span className="font-mono text-2xl font-black text-black dark:text-white block">
              {mergedBookmarks.length}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
              Saved Vault Items
            </span>
          </div>
          <div className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center brutal-shadow-sm">
            <span className="font-mono text-2xl font-black text-[#F43F5E] block">
              {notesSavedCount}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
              Personal Notes
            </span>
          </div>
          <div className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center brutal-shadow-sm">
            <span className="font-mono text-2xl font-black text-[#10B981] block">
              {combinedActivities.length}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
              Recent Actions
            </span>
          </div>
          <div className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center brutal-shadow-sm">
            <span className="font-mono text-2xl font-black text-[#FACC15] block">
              {submissionsCount + ratingsCount || resolvedFavoriteFandoms.length}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
              {submissionsCount + ratingsCount ? 'Contributions & Ratings' : 'Active Fandoms'}
            </span>
          </div>
        </div>
      )}

      {/* ================= 5. FAVORITE FANDOMS DISPLAY ================= */}
      {widgetPrefs.showFavorites && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>FAVORITE FANDOMS & CATEGORIES OF INTEREST ({resolvedFavoriteFandoms.length})</span>
            </h4>
            <button
              type="button"
              onClick={() => setEditingProfile(true)}
              className="text-[10px] font-mono font-bold uppercase text-neutral-500 hover:text-black dark:hover:text-white underline"
            >
              Edit Fandoms
            </button>
          </div>

          {resolvedFavoriteFandoms.length === 0 ? (
            <div className="p-4 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black dark:border-neutral-700 text-center">
              <p className="text-xs font-bold text-neutral-500">
                No favorite fandoms selected yet. Click &quot;Edit Fandoms&quot; to personalize your sectors!
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-2.5 ${
                isCompact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'
              }`}
            >
              {resolvedFavoriteFandoms.map((cat) => (
                <div
                  key={cat.slug || cat.name}
                  className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex flex-col justify-between gap-2 brutal-shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black text-black"
                        style={{ backgroundColor: cat.accent_color || '#FACC15' }}
                      >
                        {cat.icon} {cat.name}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase">
                        Active
                      </span>
                    </div>
                    {!isCompact && (
                      <p className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mt-1.5 truncate">
                        Spotlight: {cat.top_pick || 'Featured Canon'}
                      </p>
                    )}
                  </div>

                  {onSelectUniverse && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetSlug = cat.slug === 'tv-shows' ? 'movies-tv' : cat.slug;
                        onSelectUniverse(targetSlug);
                        onClose?.();
                      }}
                      className="w-full py-1 px-2 bg-neutral-100 dark:bg-[#161B22] hover:bg-[#FACC15] hover:text-black text-black dark:text-white font-mono text-[10px] font-black uppercase border border-black transition-colors text-center"
                    >
                      Explore {cat.name} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 6. BOOKMARKED ITEMS COLLECTION & PERSONAL NOTES ================= */}
      {widgetPrefs.showBookmarks && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#F43F5E]" />
              <span>BOOKMARKED ITEMS COLLECTION & PERSONAL NOTES ({filteredBookmarks.length})</span>
            </h4>

            {/* Type Filter Pills */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'ARTICLE', label: 'Articles', icon: FileText },
                { id: 'CHARACTER', label: 'Characters', icon: Users },
                { id: 'VIDEO', label: 'Videos & Audio', icon: Film },
                { id: 'MERCHANDISE', label: 'Merchandise', icon: ShoppingBag },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setBookmarkFilter(tab.id)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black transition-colors ${
                    bookmarkFilter === tab.id
                      ? 'bg-[#F43F5E] text-white'
                      : 'bg-white dark:bg-[#0D1117] text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="p-5 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black dark:border-neutral-700 text-center">
              <Bookmark className="w-6 h-6 mx-auto text-neutral-400 mb-2" />
              <p className="font-bold text-xs text-neutral-600 dark:text-neutral-400">
                No bookmarked items in this category yet! Bookmark articles, character profiles, trailers, or merchandise drops to organize them with personal notes.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {filteredBookmarks.map((item) => {
                const isEditingThisNote = editingNoteKey === item.key;

                return (
                  <div
                    key={item.key}
                    className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        {item.thumbnailUrl && !isCompact && (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-11 h-11 object-cover border border-black shrink-0 bg-neutral-900"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.5 bg-[#FACC15] text-black border border-black">
                              {item.categoryType}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-[#F43F5E] uppercase">
                              {item.categoryName}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400">
                              • {item.date}
                            </span>
                          </div>
                          <h5 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white mt-0.5 truncate">
                            {item.title}
                          </h5>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            isEditingThisNote
                              ? setEditingNoteKey(null)
                              : handleStartEditNote(item)
                          }
                          className="px-2 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-neutral-100 dark:bg-[#161B22] text-black dark:text-white hover:bg-[#FACC15] hover:text-black flex items-center gap-1"
                          title="Add or edit personal note on this bookmark"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{item.note ? 'Edit Note' : '+ Note'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveBookmark(item)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 border border-transparent hover:border-red-500"
                          title="Remove Bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Display Existing Personal Note */}
                    {item.note && !isEditingThisNote && (
                      <div className="p-2 bg-[#FEF9C3] dark:bg-yellow-950/30 border-l-4 border-black dark:border-[#FACC15] text-xs flex items-start gap-2">
                        <StickyNote className="w-3.5 h-3.5 text-black dark:text-[#FACC15] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[9px] font-black uppercase text-neutral-600 dark:text-[#FACC15] block">
                            PERSONAL COLLECTOR NOTE:
                          </span>
                          <p className="text-xs font-medium text-neutral-900 dark:text-neutral-200 break-words">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Inline Personal Note Editor */}
                    {isEditingThisNote && (
                      <div className="p-2.5 bg-neutral-100 dark:bg-[#161B22] border-2 border-black dark:border-neutral-500 space-y-2">
                        <label className="block font-mono text-[10px] font-black uppercase text-black dark:text-white">
                          Personal Note for &quot;{item.title}&quot; (Max 500 chars)
                        </label>
                        <textarea
                          rows={2}
                          maxLength={500}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Add episode timestamp, cosplay measurements, lore reminder, or drop alert memo..."
                          className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-medium bg-white dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-neutral-500">
                            {noteDraft.length}/500 characters
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingNoteKey(null)}
                              className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-white dark:bg-neutral-800 text-black dark:text-white flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> Cancel
                            </button>
                            <button
                              type="button"
                              disabled={savingNote}
                              onClick={() => handleSaveBookmarkNote(item)}
                              className="px-3 py-1 text-[10px] font-mono font-black uppercase border border-black bg-[#A3E635] text-black flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />{' '}
                              {savingNote ? 'Saving...' : 'Save Note'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= 7. RECENT ACTIVITY STREAM ================= */}
      {widgetPrefs.showActivity && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>RECENT ACTIVITY & BROWSING STREAM ({filteredActivities.length})</span>
            </h4>

            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'ALL', label: 'All Activity' },
                { id: 'VIEW', label: 'Browsing & Views' },
                { id: 'BOOKMARK', label: 'Bookmarks & Notes' },
                { id: 'INTERACTION', label: 'Ratings & AI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivityFilter(tab.id)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                    activityFilter === tab.id
                      ? 'bg-[#38BDF8] text-black'
                      : 'bg-white dark:bg-[#0D1117] text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              {combinedActivities.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearActivityStream}
                  className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-red-600 hover:underline ml-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="p-4 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black dark:border-neutral-700 text-center">
              <Clock className="w-5 h-5 mx-auto text-neutral-400 mb-1" />
              <p className="text-xs font-bold text-neutral-500">
                No recent activity recorded in this filter yet. Explore universes, watch trailers, or inspect character lore!
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-2.5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 bg-neutral-100 dark:bg-[#161B22] border border-black flex items-center justify-center shrink-0">
                      {act.actionType === 'BOOKMARK' || act.actionType === 'NOTE' ? (
                        <Bookmark className="w-3.5 h-3.5 text-[#F43F5E]" />
                      ) : act.actionType === 'RATING' ? (
                        <Star className="w-3.5 h-3.5 text-[#FACC15]" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white border border-black">
                          {act.actionLabel}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#38BDF8] uppercase">
                          {act.categoryName}
                        </span>
                      </div>
                      <p className="font-black text-xs text-black dark:text-white truncate mt-0.5">
                        {act.targetTitle}
                      </p>
                      {act.detail && (
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {act.detail}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-neutral-400 shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 8. RECENT FAN SUBMISSIONS ================= */}
      {widgetPrefs.showSubmissions && recentSubmissions.length > 0 && (
        <div>
          <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#34D399]" />
            <span>YOUR COMMUNITY VAULT SUBMISSIONS</span>
          </h4>
          <div className="space-y-2">
            {recentSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-2.5 bg-neutral-50 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">
                    {sub.category}
                  </span>
                  <span className="font-black text-xs uppercase text-black dark:text-white">
                    {sub.title}
                  </span>
                  {sub.admin_feedback && (
                    <span className="block text-[11px] font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                      Moderator Note: {sub.admin_feedback}
                    </span>
                  )}
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                    sub.status === 'APPROVED'
                      ? 'bg-[#A3E635] text-black'
                      : sub.status === 'REJECTED'
                        ? 'bg-[#F43F5E] text-white'
                        : 'bg-[#FACC15] text-black'
                  }`}
                >
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 9. PERSONALIZED RADAR RECOMMENDATIONS ================= */}
      {widgetPrefs.showRecommendations && recommendations.length > 0 && (
        <div>
          <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>PERSONALIZED RADAR RECOMMENDATIONS</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {recommendations.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                className="p-3 bg-neutral-50 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-black uppercase text-[#38BDF8] block">
                    {rec.category_name} • {rec.content_type}
                  </span>
                  <h5 className="font-black text-xs uppercase text-black dark:text-white truncate">
                    {rec.title}
                  </h5>
                  {rec.synopsis && !isCompact && (
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                      {rec.synopsis}
                    </p>
                  )}
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-black bg-[#FACC15] text-black border border-black shrink-0">
                  ★ {rec.popularity_score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-40 w-full bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">Personalized Collector Dashboard</h2>
          <button
            onClick={() => {
              logout();
              onClose?.();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#A3E635] text-black font-black text-xs sm:text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn hover:bg-[#86efac]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto flex-1 p-6">{content}</main>
    </div>
  );
}