'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, type Auth } from 'firebase/auth';

// In production, prefer environment variables. Using provided config for now.
const firebaseConfig = {
  apiKey: "AIzaSyDZFPkBjHK3eOvBTVWiqAq4VxZz4DrO2e4",
  authDomain: "goldentag72230.firebaseapp.com",
  projectId: "goldentag72230",
  storageBucket: "goldentag72230.firebasestorage.app",
  messagingSenderId: "536768136779",
  appId: "1:536768136779:web:03f1b8a07fafae210c2fce",
  measurementId: "G-C5C85JYH1T"
};


let app: FirebaseApp;
let analytics: Analytics | undefined;
let auth: Auth;
let googleProvider: GoogleAuthProvider;
let facebookProvider: FacebookAuthProvider;

export function getFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      // getAnalytics only works in browser environments with window object
      analytics = undefined;
    }
  } else {
    app = getApp();
  }
  return app;
}

export function getFirebaseAnalytics(): Analytics | undefined {
  if (!analytics) {
    try {
      analytics = getAnalytics(app ?? getFirebaseApp());
    } catch (e) {
      analytics = undefined;
    }
  }
  return analytics;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getGoogleProvider(): GoogleAuthProvider {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  }
  return googleProvider;
}

export function getFacebookProvider(): FacebookAuthProvider {
  if (!facebookProvider) {
    facebookProvider = new FacebookAuthProvider();
    // Request email and public_profile by default
    facebookProvider.addScope('email');
    facebookProvider.addScope('public_profile');
  }
  return facebookProvider;
}

