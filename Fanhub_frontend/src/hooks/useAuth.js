import { useState, useEffect, useCallback } from 'react';
import { accountsApi, getStoredAuth, setStoredAuth } from '../services/api';

// Shared in-memory cache for dashboard data so all useAuth() consumers see fresh data
let sharedDashboardCache = null;

export function useAuth() {
  const [session, setSession] = useState(() => getStoredAuth());
  const [dashboard, setDashboard] = useState(() => sharedDashboardCache);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep all hook instances synchronized when auth or dashboard changes
  useEffect(() => {
    const handleSync = () => {
      setSession(getStoredAuth());
      setDashboard(sharedDashboardCache);
    };

    window.addEventListener('fanhub-auth-change', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('fanhub-auth-change', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const isAuthenticated = Boolean(session?.tokens?.access);
  const user = session?.user || null;
  const tokens = session?.tokens || null;
  const profile = user?.profile || dashboard?.profile || null;

  const clearError = useCallback(() => setError(null), []);

  /**
   * Authenticate with email and password via POST /api/accounts/login/
   * Supports both login({ email, password }) and login(email, password)
   */
  const login = useCallback(async (emailOrCredentials, maybePassword) => {
    setIsLoading(true);
    setError(null);
    try {
      const credentials =
        typeof emailOrCredentials === 'object' && emailOrCredentials !== null
          ? emailOrCredentials
          : { email: emailOrCredentials, password: maybePassword };

      const data = await accountsApi.login(credentials);
      const authPayload = {
        user: data.user,
        tokens: data.tokens,
        role: data.user?.role || 'MEMBER',
        timestamp: Date.now(),
      };

      setStoredAuth(authPayload);
      setSession(authPayload);
      return data;
    } catch (err) {
      const msg = err.message || 'Invalid email or password.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register a new account via POST /api/accounts/register/
   */
  const register = useCallback(async ({
    username,
    email,
    password,
    passwordConfirm,
    favoriteCategories = [],
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await accountsApi.register({
        username,
        email,
        password,
        passwordConfirm: passwordConfirm ?? password,
        favoriteCategories,
      });

      const authPayload = {
        user: data.user,
        tokens: data.tokens,
        role: data.user?.role || 'MEMBER',
        timestamp: Date.now(),
      };

      setStoredAuth(authPayload);
      setSession(authPayload);
      return data;
    } catch (err) {
      const msg = err.message || 'Registration failed. Please check your details.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear JWT session and log out user
   */
  const logout = useCallback(() => {
    sharedDashboardCache = null;
    setStoredAuth(null);
    setSession(null);
    setDashboard(null);
    setError(null);
  }, []);

  /**
   * Fetch user dashboard telemetry via GET /api/accounts/dashboard/
   */
  const fetchDashboard = useCallback(async () => {
    if (!getStoredAuth()?.tokens?.access) return null;
    setIsLoading(true);
    setError(null);
    try {
      const data = await accountsApi.getDashboard();
      sharedDashboardCache = data;
      setDashboard(data);
      window.dispatchEvent(new Event('fanhub-auth-change'));
      return data;
    } catch (err) {
      setError(err.message || 'Unable to load dashboard telemetry.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Retrieve current user profile preferences via GET /api/accounts/profile/
   */
  const fetchProfile = useCallback(async () => {
    if (!getStoredAuth()?.tokens?.access) return null;
    setIsLoading(true);
    setError(null);
    try {
      const profileData = await accountsApi.getProfile();
      const current = getStoredAuth();
      if (current && current.user) {
        const updated = {
          ...current,
          user: {
            ...current.user,
            profile: profileData,
          },
        };
        setStoredAuth(updated);
        setSession(updated);
      }
      return profileData;
    } catch (err) {
      setError(err.message || 'Failed to load user profile.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Partially update user profile preferences via PATCH /api/accounts/profile/
   */
  const updateProfile = useCallback(async (profileUpdates) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProfile = await accountsApi.updateProfile(profileUpdates);
      const current = getStoredAuth();
      if (current && current.user) {
        const updated = {
          ...current,
          user: {
            ...current.user,
            profile: updatedProfile,
          },
        };
        setStoredAuth(updated);
        setSession(updated);
      }
      return updatedProfile;
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh access token via POST /api/accounts/token/refresh/
   */
  const refreshAccessToken = useCallback(async () => {
    const current = getStoredAuth();
    const refresh = current?.tokens?.refresh;
    if (!refresh) {
      throw new Error('No refresh token available.');
    }
    const data = await accountsApi.refreshToken(refresh);
    const updated = {
      ...current,
      tokens: {
        ...current.tokens,
        access: data.access,
        refresh: data.refresh || refresh,
      },
    };
    setStoredAuth(updated);
    setSession(updated);
    return data;
  }, []);

  /**
   * Request password reset link/token via POST /api/accounts/password-reset/
   */
  const requestPasswordReset = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      return await accountsApi.requestPasswordReset(email);
    } catch (err) {
      setError(err.message || 'Failed to request password reset.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Confirm password reset via POST /api/accounts/password-reset/confirm/
   */
  const confirmPasswordReset = useCallback(async ({ uid, token, newPassword }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await accountsApi.confirmPasswordReset({ uid, token, newPassword });
    } catch (err) {
      setError(err.message || 'Failed to confirm password reset.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isAuthenticated,
    user,
    tokens,
    profile,
    dashboard,
    isLoading,
    error,
    clearError,
    login,
    register,
    logout,
    fetchDashboard,
    fetchProfile,
    updateProfile,
    refreshAccessToken,
    requestPasswordReset,
    confirmPasswordReset,
  };
}