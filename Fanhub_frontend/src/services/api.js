// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const AUTH_STORAGE_KEY = 'fanhub_auth';

/**
 * Retrieve stored auth session from localStorage
 */
export function getStoredAuth() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Retrieve the active JWT access token if logged in
 */
export function getAuthToken() {
  return getStoredAuth()?.tokens?.access || null;
}

/**
 * Save auth session to localStorage and notify subscribers
 */
export function setStoredAuth(authData) {
  if (typeof window === 'undefined') return;
  try {
    if (!authData) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    }
    window.dispatchEvent(new Event('fanhub-auth-change'));
  } catch {
    // ignore storage errors
  }
}

/**
 * Format DRF error payloads into a clean user-facing string
 */
export function formatApiError(errorData, fallbackMessage = 'Request failed. Please try again.') {
  if (!errorData) return fallbackMessage;
  if (typeof errorData === 'string') return errorData;
  if (errorData.detail) return errorData.detail;
  if (errorData.error) return errorData.error;
  if (Array.isArray(errorData.non_field_errors) && errorData.non_field_errors.length > 0) {
    return errorData.non_field_errors.join(' ');
  }

  // Extract field-level validation errors from DRF
  const messages = [];
  for (const [field, value] of Object.entries(errorData)) {
    if (field === 'status_code') continue;
    const label = field.replace(/_/g, ' ');
    if (Array.isArray(value)) {
      messages.push(`${label}: ${value.join(' ')}`);
    } else if (typeof value === 'string') {
      messages.push(`${label}: ${value}`);
    }
  }

  return messages.length > 0 ? messages.join(' | ') : fallbackMessage;
}

/**
 * Core HTTP client with automatic JWT Bearer injection & token refresh
 */
export async function apiRequest(endpoint, options = {}, retry = true) {
  const stored = getStoredAuth();
  const accessToken = stored?.tokens?.access;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (accessToken && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Attempt token refresh once on 401 if refresh token exists
  if (response.status === 401 && retry && !options.skipAuth && stored?.tokens?.refresh) {
    try {
      const refreshRes = await fetch(`${API_BASE_URL}/accounts/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: stored.tokens.refresh }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const updatedAuth = {
          ...stored,
          tokens: {
            ...stored.tokens,
            access: refreshData.access,
            refresh: refreshData.refresh || stored.tokens.refresh,
          },
        };
        setStoredAuth(updatedAuth);
        return apiRequest(endpoint, options, false);
      } else {
        setStoredAuth(null);
      }
    } catch {
      setStoredAuth(null);
    }
  }

  let data = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const err = new Error(formatApiError(data, `HTTP ${response.status}: ${response.statusText}`));
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Accounts Domain API Service
 */
export const accountsApi = {
  register: (payload) =>
    apiRequest('/accounts/register/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({
        email: payload.email,
        username: payload.username,
        password: payload.password,
        password_confirm: payload.passwordConfirm ?? payload.password_confirm ?? payload.password,
        favorite_categories: payload.favoriteCategories ?? payload.favorite_categories ?? [],
      }),
    }),

  login: ({ email, password }) =>
    apiRequest('/accounts/login/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    }),

  refreshToken: (refresh) =>
    apiRequest('/accounts/token/refresh/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ refresh }),
    }),

  getDashboard: () =>
    apiRequest('/accounts/dashboard/', {
      method: 'GET',
    }),

  getProfile: () =>
    apiRequest('/accounts/profile/', {
      method: 'GET',
    }),

  updateProfile: (profileData) =>
    apiRequest('/accounts/profile/', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    }),

  getAdminAnalytics: () =>
    apiRequest('/accounts/admin/analytics/', {
      method: 'GET',
    }),

  requestPasswordReset: (email) =>
    apiRequest('/accounts/password-reset/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email }),
    }),

  confirmPasswordReset: ({ uid, token, newPassword }) =>
    apiRequest('/accounts/password-reset/confirm/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({
        uid,
        token,
        new_password: newPassword,
      }),
    }),
};

/**
 * Chatbot Domain API Service
 */
export const chatbotApi = {
  sendMessage: (message, sessionId) =>
    apiRequest('/chatbot/query/', {
      method: 'POST',
      body: JSON.stringify({ message, session_id: sessionId }),
    }),

  getHistory: (sessionId) =>
    apiRequest(`/chatbot/history/?session_id=${encodeURIComponent(sessionId)}`, {
      method: 'GET',
    }),
};

/**
 * Public Fandoms Domain API Service (Categories, Articles, Multimedia, Character Rosters)
 */
export const fandomsApi = {
  getCategories: () =>
    apiRequest('/fandoms/categories/list/', {
      method: 'GET',
      skipAuth: true,
    }),

  getCategoryDetail: (slug) =>
    apiRequest(`/fandoms/categories/${encodeURIComponent(slug)}/`, {
      method: 'GET',
      skipAuth: true,
    }),

  getContents: ({ category, type, search, sort } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (type) params.set('type', type);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    const qs = params.toString();
    return apiRequest(`/fandoms/content/${qs ? `?${qs}` : ''}`, {
      method: 'GET',
      skipAuth: true,
    });
  },

  getContentDetail: (slug) =>
    apiRequest(`/fandoms/content/${encodeURIComponent(slug)}/detail/`, {
      method: 'GET',
      skipAuth: true,
    }),

  getCharacters: ({ category, search } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    const qs = params.toString();
    return apiRequest(`/fandoms/characters/${qs ? `?${qs}` : ''}`, {
      method: 'GET',
      skipAuth: true,
    });
  },
};

/**
 * Stream & Discover Audiovisual Vault API Service
 */
export const streamDiscoverApi = {
  getStreamDiscover: ({ category } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    const qs = params.toString();
    return apiRequest(`/fandoms/stream-discover/${qs ? `?${qs}` : ''}`, {
      method: 'GET',
      skipAuth: true,
    });
  },

  rateStreamItem: (slug, score) =>
    apiRequest(`/fandoms/stream-discover/${encodeURIComponent(slug)}/rate/`, {
      method: 'POST',
      body: JSON.stringify({ score }),
    }),

  likeStreamTrack: (slug) =>
    apiRequest(`/fandoms/stream-discover/${encodeURIComponent(slug)}/like/`, {
      method: 'POST',
    }),
};

/**
 * Normalize a backend Content object into the frontend Article shape
 */
export function normalizeBackendArticle(item, fallbackAccent = '#FACC15') {
  if (!item) return null;
  const rawBody = item.body_text || item.synopsis || '';
  const paragraphs = rawBody
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    id: `db-${item.id || item.slug}`,
    backendId: item.id,
    slug: item.slug,
    topicLabel: item.title,
    title: item.title,
    subtitle: item.synopsis || (paragraphs[0] ? paragraphs[0].slice(0, 160) : 'Verified Community & Editorial Dispatch'),
    universe: item.category_slug || 'community-vault',
    universeName: item.category_name || 'Community Vault',
    accentColor: fallbackAccent,
    author: item.artist_or_author || 'Fan Hub Editorial',
    authorRole: 'Verified Contributor',
    publishedAt: item.created_at
      ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      : 'Sept 2026',
    readTime: `${Math.max(3, Math.ceil((rawBody.split(/\s+/).length || 300) / 180))} MIN READ`,
    releaseYear: String(item.release_year || 2026),
    popularityScore: Number(item.popularity_score || 92.0),
    viewCount: Number(item.view_count || 1250),
    rating: Number(item.average_rating || 4.8),
    ratingsCount: Number(item.rating_count || 24),
    thumbnail:
      item.thumbnail_url ||
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    heroImage:
      item.thumbnail_url ||
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    tags: [item.category_name || 'Canon', item.content_type || 'ARTICLE', String(item.release_year || '2026')],
    synopsis: item.synopsis || paragraphs[0] || 'Official archived dispatch from the Fan Hub Plus database.',
    keyTakeaways: [
      `Published in the ${item.category_name || 'Fan Hub'} archive (${item.release_year || 2026}).`,
      `Authored and verified by ${item.artist_or_author || 'Fan Hub Editorial'}.`,
    ],
    sections: [
      {
        heading: '01. Full Archival Dispatch',
        paragraphs: paragraphs.length > 0 ? paragraphs : ['Full article text archived in the Fan Hub Plus database.'],
      },
    ],
  };
}

/**
 * Interactions Domain API Service (Bookmarks, Notes, Activity Stream, Submissions, Feedback)
 */
export const interactionsApi = {
  getBookmarks: () =>
    apiRequest('/interactions/bookmarks/', {
      method: 'GET',
    }),

  toggleBookmark: (payload) =>
    apiRequest('/interactions/bookmarks/toggle/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateBookmarkNote: (payload) =>
    apiRequest('/interactions/bookmarks/note/', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteBookmark: (id) =>
    apiRequest(`/interactions/bookmarks/${id}/`, {
      method: 'DELETE',
    }),

  getActivities: () =>
    apiRequest('/interactions/activity/', {
      method: 'GET',
    }),

  logActivity: (payload) =>
    apiRequest('/interactions/activity/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  clearActivities: () =>
    apiRequest('/interactions/activity/', {
      method: 'DELETE',
    }),

  submitRating: ({ contentId, score }) =>
    apiRequest('/interactions/ratings/', {
      method: 'POST',
      body: JSON.stringify({ content_id: contentId, score }),
    }),

  getSubmissions: () =>
    apiRequest('/interactions/submissions/', {
      method: 'GET',
    }),

  submitFanWork: ({ title, body, categorySlug, categoryId }) =>
    apiRequest('/interactions/submissions/', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        ...(categoryId ? { category_id: categoryId } : {}),
        ...(categorySlug ? { category_slug: categorySlug } : {}),
      }),
    }),

  submitCharacterProfile: ({ name, biography, categorySlug, categoryId, alias = '', archetype = '', origin = '', faction = '', imageUrl = '' }) =>
    apiRequest('/fandoms/character-submissions/', {
      method: 'POST',
      body: JSON.stringify({
        name,
        alias,
        archetype,
        origin,
        faction,
        image_url: imageUrl,
        biography,
        ...(categoryId ? { category_id: categoryId } : {}),
        ...(categorySlug ? { category_slug: categorySlug } : {}),
      }),
    }),

  submitFeedback: ({ email, name, feedbackType, subject, message }) =>
    apiRequest('/interactions/feedback/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        name: name || 'Collector',
        feedback_type: (feedbackType || 'BUG').toUpperCase(),
        subject: subject || 'Platform Feedback',
        message,
      }),
    }),
};

export const merchandiseApi = {
  getItems: ({ category, tag, upcoming, page, pageSize = 50 } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (tag && tag !== 'all') params.set('tag', tag);
    if (upcoming !== undefined && upcoming !== null) params.set('upcoming', String(upcoming));
    if (page) params.set('page', String(page));
    params.set('page_size', String(pageSize));
    const qs = params.toString();
    return apiRequest(`/merchandise/?${qs}`, { method: 'GET', skipAuth: true });
  },
  getUpcoming: ({ category, tag } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (tag && tag !== 'all') params.set('tag', tag);
    const qs = params.toString();
    return apiRequest(`/merchandise/upcoming/${qs ? `?${qs}` : ''}`, { method: 'GET', skipAuth: true });
  },
  trackView: (identifier) =>
    apiRequest(`/merchandise/${encodeURIComponent(identifier)}/track-click/`, { method: 'POST', skipAuth: true }),
};

export const adminApi = {
  getAnalytics: () =>
    apiRequest('/accounts/admin/analytics/', {
      method: 'GET',
    }),

  // Categories
  getCategories: () =>
    apiRequest('/fandoms/categories/list/', {
      method: 'GET',
    }),

  // Content & Multimedia (Articles, Video Trailers, Audio Tracks)
  getContentList: (params = '') =>
    apiRequest(`/fandoms/content/?include_unpublished=true${params ? `&${params}` : ''}`, {
      method: 'GET',
    }),

  createContent: (payload) =>
    apiRequest('/fandoms/content/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateContent: (idOrSlug, payload) =>
    apiRequest(`/fandoms/content/${idOrSlug}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteContent: (idOrSlug) =>
    apiRequest(`/fandoms/content/${idOrSlug}/`, {
      method: 'DELETE',
    }),

  // Character Profiles
  getCharacters: () =>
    apiRequest('/fandoms/characters/', {
      method: 'GET',
    }),

  createCharacter: (payload) =>
    apiRequest('/fandoms/characters/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateCharacter: (idOrSlug, payload) =>
    apiRequest(`/fandoms/characters/${idOrSlug}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteCharacter: (idOrSlug) =>
    apiRequest(`/fandoms/characters/${idOrSlug}/`, {
      method: 'DELETE',
    }),

  // Event Highlights
  getEvents: () =>
    apiRequest('/events/manage/', {
      method: 'GET',
    }),

  createEvent: (payload) =>
    apiRequest('/events/manage/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateEvent: (idOrSlug, payload) =>
    apiRequest(`/events/manage/${idOrSlug}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteEvent: (idOrSlug) =>
    apiRequest(`/events/manage/${idOrSlug}/`, {
      method: 'DELETE',
    }),

  // Merchandise Items
  getMerchandise: () =>
    apiRequest('/merchandise/manage/', {
      method: 'GET',
    }),

  createMerchandise: (payload) =>
    apiRequest('/merchandise/manage/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateMerchandise: (idOrSlug, payload) =>
    apiRequest(`/merchandise/manage/${idOrSlug}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteMerchandise: (idOrSlug) =>
    apiRequest(`/merchandise/manage/${idOrSlug}/`, {
      method: 'DELETE',
    }),

  // AI Chatbot Knowledge Base & FAQs
  getFaqs: () =>
    apiRequest('/chatbot/faqs/manage/', {
      method: 'GET',
    }),

  createFaq: (payload) =>
    apiRequest('/chatbot/faqs/manage/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateFaq: (id, payload) =>
    apiRequest(`/chatbot/faqs/manage/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteFaq: (id) =>
    apiRequest(`/chatbot/faqs/manage/${id}/`, {
      method: 'DELETE',
    }),

  getChatbotAudit: () =>
    apiRequest('/chatbot/audit/', {
      method: 'GET',
    }),

  // Moderation Queue (Fan Submissions)
  getModerationQueue: (status = 'ALL') =>
    apiRequest(`/interactions/moderation/?status=${status}`, {
      method: 'GET',
    }),

  moderateSubmission: (id, { status, adminFeedback = '' }) =>
    apiRequest(`/interactions/moderation/${id}/moderate/`, {
      method: 'PATCH',
      body: JSON.stringify({
        status,
        admin_feedback: adminFeedback,
      }),
    }),

  getCharacterModerationQueue: (status = 'ALL') =>
    apiRequest(`/fandoms/character-submissions/manage/?status=${status}`, {
      method: 'GET',
    }),

  moderateCharacterSubmission: (id, { status, adminFeedback = '', ...changes }) =>
    apiRequest(`/fandoms/character-submissions/manage/${id}/moderate/`, {
      method: 'PATCH',
      body: JSON.stringify({ status, admin_feedback: adminFeedback, ...changes }),
    }),

  deleteSubmission: (id) =>
    apiRequest(`/interactions/moderation/${id}/`, {
      method: 'DELETE',
    }),

  // User Feedback & Bug Resolution
  getFeedbackList: (type = 'ALL', status = 'ALL') =>
    apiRequest(`/interactions/admin/feedback/?type=${type}&status=${status}`, {
      method: 'GET',
    }),

  updateFeedbackStatus: (id, status) =>
    apiRequest(`/interactions/admin/feedback/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  deleteFeedback: (id) =>
    apiRequest(`/interactions/admin/feedback/${id}/`, {
      method: 'DELETE',
    }),
};
