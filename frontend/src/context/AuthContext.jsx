import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mw_token');
    if (!token) {
      setReady(true);
      return;
    }
    apiFetch('/api/auth/me')
      .then((json) => setUser(json.user))
      .catch(() => localStorage.removeItem('mw_token'))
      .finally(() => setReady(true));
  }, []);

  const signup = async (name, email, password) => {
    const json = await apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    localStorage.setItem('mw_token', json.token);
    setUser(json.user);
  };

  const login = async (email, password) => {
    const json = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    localStorage.setItem('mw_token', json.token);
    setUser(json.user);
  };

  const logout = () => {
    localStorage.removeItem('mw_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
