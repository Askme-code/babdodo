'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore'

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// This function ensures Firebase is initialized only once.
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
firestore = getFirestore(app);


// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
    // This function now just returns the already initialized services.
    return { firebaseApp: app, auth, firestore };
}

// Export the initialized services.
export { app as firebaseApp, auth, firestore };

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
