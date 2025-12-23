// IMPORTANT: This file should only be used on the server.
// It is not meant to be used in client components.
import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// This is a robust, server-safe pattern for initializing the Firebase Admin SDK.
// It ensures the app is initialized only once, preventing errors in hot-reload
// and serverless environments.

let app: App;

if (getApps().length === 0) {
  // If no app is initialized, create a new one with credentials from environment variables.
  // This is the standard and secure way to handle server-side authentication.
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key needs to have its newlines properly formatted.
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
} else {
  // If an app is already initialized, get the existing one.
  // This prevents re-initialization errors.
  app = getApps()[0];
}

// Export a single, memoized Firestore instance for use across the server.
export const firestore: Firestore = getFirestore(app);
