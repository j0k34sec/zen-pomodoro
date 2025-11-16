'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Update profile with username
      await updateProfile(user, { displayName: username });

      // Create user document in Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        username: username,
        displayName: username,
        photoURL: user.photoURL,
        createdAt: new Date(),
        totalFocusTime: 0,
        totalSessions: 0,
        currentStreak: 0,
        longestStreak: 0,
        achievements: [],
        friends: [],
        settings: {
          timerDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          longBreakInterval: 4,
          soundEnabled: true,
          notificationsEnabled: true,
          darkMode: true
        }
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document exists, create if not
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || user.email?.split('@')[0],
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          totalFocusTime: 0,
          totalSessions: 0,
          currentStreak: 0,
          longestStreak: 0,
          achievements: [],
          friends: [],
          settings: {
            timerDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            longBreakInterval: 4,
            soundEnabled: true,
            notificationsEnabled: true,
            darkMode: true
          }
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document exists, create if not
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || user.email?.split('@')[0],
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          totalFocusTime: 0,
          totalSessions: 0,
          currentStreak: 0,
          longestStreak: 0,
          achievements: [],
          friends: [],
          settings: {
            timerDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            longBreakInterval: 4,
            soundEnabled: true,
            notificationsEnabled: true,
            darkMode: true
          }
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithGithub,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}