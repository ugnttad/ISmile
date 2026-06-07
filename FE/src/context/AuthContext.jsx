import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { AuthContext } from './authStore';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await api.getMe();
      setUser(res.data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadUser();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadUser]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: !!user }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
