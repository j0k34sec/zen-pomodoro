import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface AuthError extends Error {
  code: string;
}

class AuthenticationError extends Error implements AuthError {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'AuthenticationError';
  }
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new AuthenticationError(error.code, getErrorMessage(error.code));
  }
};

export const registerWithEmail = async (email: string, password: string, username: string) => {
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
    return user;
  } catch (error: any) {
    throw new AuthenticationError(error.code, getErrorMessage(error.code));
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new AuthenticationError(error.code, getErrorMessage(error.code));
  }
};

export const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, updates);

      // Update Firestore document
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        displayName: updates.displayName,
        photoURL: updates.photoURL,
        updatedAt: new Date()
      });
    }
  } catch (error: any) {
    throw new AuthenticationError(error.code, getErrorMessage(error.code));
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new AuthenticationError(error.code, getErrorMessage(error.code));
  }
};

function getErrorMessage(code: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/requires-recent-login': 'Please sign in again to update your profile.',
    'auth/invalid-credential': 'Invalid credentials provided.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
    'auth/popup-blocked': 'Sign-in popup was blocked by the browser.',
    'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in method.',
    'auth/invalid-verification-code': 'Invalid verification code.',
    'auth/invalid-verification-id': 'Invalid verification ID.',
    'auth/missing-verification-code': 'Missing verification code.',
    'auth/missing-verification-id': 'Missing verification ID.'
  };

  return errorMessages[code] || 'An authentication error occurred. Please try again.';
}