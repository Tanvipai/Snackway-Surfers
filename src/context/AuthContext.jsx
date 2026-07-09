import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

const EMAIL_DOMAIN = 'snackwaysurfers.app';
const usernameToEmail = (username) => `${username.trim().toLowerCase()}@${EMAIL_DOMAIN}`;
const usernameFromUser = (fbUser) => fbUser.displayName || (fbUser.email || '').split('@')[0];

function loadProfile(uid) {
  try { return JSON.parse(localStorage.getItem(`eg_profile_${uid}`) || '{}'); }
  catch { return {}; }
}
function saveProfile(uid, data) {
  localStorage.setItem(`eg_profile_${uid}`, JSON.stringify(data));
}

function mapAuthError(err) {
  switch (err?.code) {
    case 'auth/email-already-in-use': return 'Username already taken.';
    case 'auth/weak-password': return 'Password too short (min 6).';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid username or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/requires-recent-login':
      return 'Please re-enter your current password.';
    default:
      return err?.message || 'Something went wrong.';
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const profile = loadProfile(fbUser.uid);
        setUser({
          uid: fbUser.uid,
          username: usernameFromUser(fbUser),
          email: profile.email || '',
          charId: profile.charId || null,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      await signInWithEmailAndPassword(auth, usernameToEmail(username), password);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }, []);

  const signup = useCallback(async (username, email, password, charId) => {
    const uname = username.trim().toLowerCase();
    try {
      const cred = await createUserWithEmailAndPassword(auth, usernameToEmail(uname), password);
      await updateProfile(cred.user, { displayName: uname });
      saveProfile(cred.user.uid, { charId: charId || null, email: email || '' });
      setUser({ uid: cred.user.uid, username: uname, email: email || '', charId: charId || null });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  const changeUsername = useCallback(async (newUsername, currentPassword) => {
    const fbUser = auth.currentUser;
    if (!fbUser) return { ok: false, error: 'Not logged in.' };
    const newU = newUsername.trim().toLowerCase();
    if (!newU) return { ok: false, error: 'Enter a new username.' };
    if (newU === user?.username) return { ok: false, error: 'Same as current username.' };
    try {
      await reauthenticateWithCredential(fbUser, EmailAuthProvider.credential(fbUser.email, currentPassword));
      await updateEmail(fbUser, usernameToEmail(newU));
      await updateProfile(fbUser, { displayName: newU });
      setUser(prev => ({ ...prev, username: newU }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }, [user]);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    const fbUser = auth.currentUser;
    if (!fbUser) return { ok: false, error: 'Not logged in.' };
    try {
      await reauthenticateWithCredential(fbUser, EmailAuthProvider.credential(fbUser.email, currentPassword));
      await updatePassword(fbUser, newPassword);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, changeUsername, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
