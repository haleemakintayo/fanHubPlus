import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Bookmark,
  Sparkles,
  FileText,
  User,
  Save,
  LogOut,
  RefreshCw,
} from 'lucide-react';

export default function Dashboard({
  embedded = false,
  bookmarkedItems = {},
  toggleBookmark,
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

  const [bio, setBio] = useState('');
  const [themePref, setThemePref] = useState('LIGHT');
  const [fontPref, setFontPref] = useState('NORMAL');
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboard().catch(() => {
        // silent fallback if offline
      });
    }
  }, [isAuthenticated, fetchDashboard]);

  useEffect(() => {
    const profileSource = dashboard?.profile || user?.profile;
    if (profileSource) {
      setBio(profileSource.bio || '');
      setThemePref(profileSource.theme_preference || 'LIGHT');
      setFontPref(profileSource.font_size_preference || 'NORMAL');
    }
  }, [dashboard, user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        bio,
        theme_preference: themePref,
        font_size_preference: fontPref,
      });
      await fetchDashboard();
      setEditingProfile(false);
      onShowToast?.({
        title: 'Profile Updated',
        message: 'Your collector bio and telemetry preferences have been saved.',
        type: 'success',
      });
    } catch (err) {
      onShowToast?.({
        title: 'Profile Update Failed',
        message: err.message || 'Could not save profile changes.',
        type: 'error',
      });
    }
  };

  const localBookmarksList = Object.entries(bookmarkedItems).map(([id, item]) => ({
    id,
    title: item.title,
    type: item.type || 'Fandom Entry',
    source: 'local',
  }));

  const serverBookmarksList = (dashboard?.bookmarks || []).map((b) => ({
    id: `srv-${b.id}`,
    title: b.content_title,
    type: b.category_name || b.content_type || 'Vault Bookmark',
    source: 'server',
  }));

  const combinedBookmarks = [...serverBookmarksList, ...localBookmarksList];
  const totalBookmarksCount =
    (dashboard?.stats?.bookmarks_count || 0) + localBookmarksList.length;
  const submissionsCount = dashboard?.stats?.submissions_count || 0;
  const ratingsCount = dashboard?.stats?.ratings_count || 0;
  const recommendations = dashboard?.personalized_recommendations || [];
  const recentSubmissions = dashboard?.recent_submissions || [];
  const favoriteCategories =
    dashboard?.profile?.favorite_categories ||
    user?.profile?.favorite_categories ||
    [];

  const content = (
    <div className="space-y-6">
      {/* Identity Banner */}
      <div className="p-4 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FACC15] text-black border-2 border-black flex items-center justify-center font-black text-base uppercase">
            {(user?.username || 'C')[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-sm sm:text-base uppercase text-black dark:text-white">
                {user?.username || 'Guest Collector'}
              </h4>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-black uppercase bg-[#A3E635] text-black border border-black">
                {user?.role || 'VISITOR'}
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-500">
              {user?.email || 'Sign in to sync telemetry across devices'}
            </p>
          </div>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setEditingProfile((prev) => !prev)}
              className="px-2.5 py-1 text-[10px] font-mono font-black uppercase border-2 border-black dark:border-neutral-300 bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm brutal-btn flex items-center gap-1"
            >
              <User className="w-3 h-3" />
              <span>{editingProfile ? 'Cancel' : 'Edit Profile'}</span>
            </button>
            <button
              type="button"
              onClick={() => fetchDashboard()}
              disabled={isLoading}
              className="p-1.5 border-2 border-black dark:border-neutral-300 bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm brutal-btn"
              title="Refresh Dashboard Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Profile Editor Drawer (PATCH /api/accounts/profile/) */}
      {isAuthenticated && editingProfile && (
        <form
          onSubmit={handleSaveProfile}
          className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-white space-y-3 brutal-shadow-sm"
        >
          <h5 className="font-mono text-xs font-black uppercase text-black dark:text-white">
            Update Collector Profile Preferences
          </h5>

          <div>
            <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
              Collector Bio
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share your favorite universes, main characters, or cosplay builds..."
              className="w-full border-2 border-black dark:border-neutral-600 p-2 text-xs font-medium bg-white dark:bg-[#161B22] text-black dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                Default Theme
              </label>
              <select
                value={themePref}
                onChange={(e) => setThemePref(e.target.value)}
                className="w-full border-2 border-black dark:border-neutral-600 p-1.5 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
              >
                <option value="LIGHT">Light Mode</option>
                <option value="DARK">Dark Mode</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-black uppercase text-neutral-500 mb-1">
                Default Font Scale
              </label>
              <select
                value={fontPref}
                onChange={(e) => setFontPref(e.target.value)}
                className="w-full border-2 border-black dark:border-neutral-600 p-1.5 text-xs font-bold bg-white dark:bg-[#161B22] text-black dark:text-white"
              >
                <option value="SMALL">Small</option>
                <option value="NORMAL">Normal</option>
                <option value="LARGE">Large</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
          </button>
        </form>
      )}

      {/* Favorite Sectors */}
      {favoriteCategories.length > 0 && (
        <div>
          <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block mb-1.5">
            Active Sector Affiliations
          </span>
          <div className="flex flex-wrap gap-1.5">
            {favoriteCategories.map((cat) => (
              <span
                key={cat.id || cat.slug}
                className="px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black text-black"
                style={{ backgroundColor: cat.accent_color || '#FACC15' }}
              >
                {cat.icon ? `${cat.icon} ` : ''}{cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center">
          <span className="font-mono text-2xl font-black text-black dark:text-white block">
            {totalBookmarksCount}
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
            Bookmarks Saved
          </span>
        </div>
        <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center">
          <span className="font-mono text-2xl font-black text-black dark:text-white block">
            {submissionsCount}
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
            Submissions
          </span>
        </div>
        <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center">
          <span className="font-mono text-2xl font-black text-black dark:text-white block">
            {ratingsCount || 'Tier 4'}
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
            {ratingsCount ? 'Ratings Cast' : 'Hub Rank'}
          </span>
        </div>
      </div>

      {/* Bookmarked items list */}
      <div>
        <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2 flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-[#F43F5E]" />
          <span>SAVED VAULT ITEMS</span>
        </h4>
        {combinedBookmarks.length === 0 ? (
          <div className="p-5 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black dark:border-neutral-700 text-center">
            <Bookmark className="w-6 h-6 mx-auto text-neutral-400 mb-2" />
            <p className="font-bold text-xs text-neutral-600 dark:text-neutral-400">
              No items bookmarked yet! Click the bookmark icon on any character or trailer to save them here.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {combinedBookmarks.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#F43F5E] uppercase block">
                    {item.type}
                  </span>
                  <h5 className="font-black text-xs uppercase text-black dark:text-white">
                    {item.title}
                  </h5>
                </div>
                {item.source === 'local' && toggleBookmark && (
                  <button
                    type="button"
                    onClick={() => toggleBookmark(item.id, item.title, item.type)}
                    className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Fan Submissions from Backend */}
      {recentSubmissions.length > 0 && (
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
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black bg-[#FACC15] text-black">
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Recommendations from Backend */}
      {recommendations.length > 0 && (
        <div>
          <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>PERSONALIZED RADAR RECOMMENDATIONS</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendations.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                className="p-2.5 bg-neutral-50 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700"
              >
                <span className="text-[10px] font-mono font-black uppercase text-[#38BDF8] block">
                  {rec.category_name} • {rec.content_type}
                </span>
                <h5 className="font-black text-xs uppercase text-black dark:text-white truncate">
                  {rec.title}
                </h5>
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
          <h2 className="text-xl font-black uppercase">Collector Dashboard</h2>
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

      <main className="max-w-4xl mx-auto flex-1 p-6">{content}</main>
    </div>
  );
}