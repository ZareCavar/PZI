import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth, db } from '../firebaseConfig.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, u => {
      setUser(u);
      if (!u) {
        setRole('guest');
        setLoading(false);
        return;
      }
      const unsubUserDoc = onSnapshot(doc(db, 'users', u.uid), snap => {
        setRole(snap.data()?.role ?? 'user');
        setLoading(false);
      });
      return unsubUserDoc;
    });
    return unsubAuth;
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole('guest');
  };

  return (
    <AuthContext.Provider value={{ user, role, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
