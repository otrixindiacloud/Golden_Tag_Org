'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, type Auth } from 'firebase/auth';

// In production, prefer environment variables. Using provided config for now.
const firebaseConfig = {
  apiKey: 'AIzaSyBm3zu1JjTYw6N-pARwN5hPwxCGmhfb3MM',
  authDomain: 'golden-tag-526f6.firebaseapp.com',
  projectId: 'golden-tag-526f6',
  storageBucket: 'golden-tag-526f6.firebasestorage.app',
  messagingSenderId: '336114555270',
  appId: '1:336114555270:web:9a856d528a6fdd52a37407',
  measurementId: 'G-QZY4H1R8H5',
};

let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;
let facebookProvider: FacebookAuthProvider;

export function getFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  return app;
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


