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
  /**
   * POST /api/accounts/register/
   */
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

  /**
   * POST /api/accounts/login/
   */
  login: ({ email, password }) =>
    apiRequest('/accounts/login/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    }),

  /**
   * POST /api/accounts/token/refresh/
   */
  refreshToken: (refresh) =>
    apiRequest('/accounts/token/refresh/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ refresh }),
    }),

  /**
   * GET /api/accounts/dashboard/
   */
  getDashboard: () =>
    apiRequest('/accounts/dashboard/', {
      method: 'GET',
    }),

  /**
   * GET /api/accounts/profile/
   */
  getProfile: () =>
    apiRequest('/accounts/profile/', {
      method: 'GET',
    }),

  /**
   * PATCH /api/accounts/profile/
   */
  updateProfile: (profileData) =>
    apiRequest('/accounts/profile/', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    }),

  /**
   * POST /api/accounts/password-reset/
   */
  requestPasswordReset: (email) =>
    apiRequest('/accounts/password-reset/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email }),
    }),

  /**
   * POST /api/accounts/password-reset/confirm/
   */
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
