import { useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('fanhub_auth');
    return !!stored;
  });

  const login = (role) => {
    const roleValue = role ?? 'registered'; // default to registered if not provided
    const user = { role: roleValue, timestamp: Date.now() };
    localStorage.setItem('fanhub_auth', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('fanhub_auth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}