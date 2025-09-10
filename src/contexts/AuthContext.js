'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth, getGoogleProvider, getFacebookProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const normalizedUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email || 'User',
          email: firebaseUser.email,
          provider: firebaseUser.providerData?.[0]?.providerId || 'firebase',
          avatar: firebaseUser.photoURL || undefined,
          phone: firebaseUser.phoneNumber || null
        };
        setUser(normalizedUser);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const auth = getFirebaseAuth();
      const provider = getGoogleProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const normalizedUser = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email || 'User',
        email: firebaseUser.email,
        provider: 'google',
        avatar: firebaseUser.photoURL || undefined,
        phone: firebaseUser.phoneNumber || null
      };
      setUser(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      router.push('/');
      return { success: true, user: normalizedUser };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithFacebook = async () => {
    try {
      const auth = getFirebaseAuth();
      const provider = getFacebookProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const normalizedUser = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email || 'User',
        email: firebaseUser.email,
        provider: 'facebook',
        avatar: firebaseUser.photoURL || undefined,
        phone: firebaseUser.phoneNumber || null
      };
      setUser(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      router.push('/');
      return { success: true, user: normalizedUser };
    } catch (error) {
      console.error('Facebook login error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithPhone = async (phoneNumber, otp) => {
    try {
      const auth = getFirebaseAuth();
      // Initialize invisible reCAPTCHA if not already
      if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }
      if (!window.confirmationResult) {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        window.confirmationResult = confirmationResult;
        // If OTP not provided yet, signal that it was sent
        if (!otp) {
          return { success: true, codeSent: true };
        }
      }
      if (otp) {
        const result = await window.confirmationResult.confirm(otp);
        const u = result.user;
        const normalizedUser = {
          id: u.uid,
          name: u.displayName || u.phoneNumber || 'User',
          email: u.email,
          provider: 'phone',
          avatar: u.photoURL || undefined,
          phone: u.phoneNumber || phoneNumber
        };
        setUser(normalizedUser);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        router.push('/');
        return { success: true, user: normalizedUser };
      }
      return { success: true, codeSent: true };
    } catch (error) {
      console.error('Phone login error:', error);
      return { success: false, error: error.message };
    }
  };

  const registerWithEmail = async (email, password, name) => {
    try {
      const auth = getFirebaseAuth();
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        try { await firebaseUpdateProfile(cred.user, { displayName: name }); } catch {}
      }
      const u = cred.user;
      const normalizedUser = {
        id: u.uid,
        name: u.displayName || name || u.email || 'User',
        email: u.email,
        provider: 'email',
        avatar: u.photoURL || undefined,
        phone: u.phoneNumber || null
      };
      setUser(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      router.push('/');
      return { success: true, user: normalizedUser };
    } catch (error) {
      console.error('Email registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const registerWithOTP = async (userData) => {
    try {
      // Simulate OTP-based registration - in real app, integrate with your backend
      const { firstName, lastName, email, phone, password, otp } = userData;
      
      // Verify OTP (in real app, this would be verified against backend)
      const storedOTP = sessionStorage.getItem('tempOTP');
      if (otp !== storedOTP) {
        return { success: false, error: 'Invalid OTP' };
      }
      
      // Create user account
      const mockUser = {
        id: 'otp_' + Date.now(),
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        provider: 'otp',
        avatar: 'https://via.placeholder.com/150/6B7280/FFFFFF?text=U',
        isVerified: true,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Clear temporary data
      sessionStorage.removeItem('tempOTP');
      sessionStorage.removeItem('tempEmail');
      sessionStorage.removeItem('tempPhone');
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('OTP registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const auth = getFirebaseAuth();
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const u = cred.user;
      const normalizedUser = {
        id: u.uid,
        name: u.displayName || u.email || 'User',
        email: u.email,
        provider: 'email',
        avatar: u.photoURL || undefined,
        phone: u.phoneNumber || null
      };
      setUser(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      router.push('/');
      return { success: true, user: normalizedUser };
    } catch (error) {
      console.error('Email login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  const updateProfile = async (updates) => {
    try {
      const auth = getFirebaseAuth();
      if (auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, updates);
      }
    } catch {}
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    loginWithFacebook,
    loginWithPhone,
    registerWithEmail,
    registerWithOTP,
    loginWithEmail,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
