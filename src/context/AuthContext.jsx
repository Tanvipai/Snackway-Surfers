import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

function getUsers() {
  try { return JSON.parse(localStorage.getItem('eg_users') || '{}'); }
  catch { return {}; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eg_current_user') || 'null'); }
    catch { return null; }
  });

  const login = useCallback((username, password) => {
    const users = getUsers();
    const stored = users[username.toLowerCase()];
    if (!stored) return { ok: false, error: 'Invalid username or password.' };
    if (stored.password !== password) return { ok: false, error: 'Invalid username or password.' };
    const u = { username: username.toLowerCase(), email: stored.email || '', charId: stored.charId || null };
    setUser(u);
    localStorage.setItem('eg_current_user', JSON.stringify(u));
    return { ok: true };
  }, []);

  const signup = useCallback((username, email, password, charId) => {
    const users = getUsers();
    if (users[username.toLowerCase()]) return { ok: false, error: 'Username already taken.' };
    users[username.toLowerCase()] = { password, email, charId: charId || null };
    localStorage.setItem('eg_users', JSON.stringify(users));
    const u = { username: username.toLowerCase(), email, charId: charId || null };
    setUser(u);
    localStorage.setItem('eg_current_user', JSON.stringify(u));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('eg_current_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
