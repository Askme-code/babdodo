'use server';
// IMPORTANT: This file should only be used on the server.
// It is not meant to be used in client components.
import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

let app: App;

// This is a robust, server-safe pattern for initializing the Firebase Admin SDK.
// It ensures the app is initialized only once, preventing errors in hot-reload
// and serverless environments.

// Before initializing, check if all required environment variables are present.
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Firebase Admin SDK initialization failed. The following environment variables are missing: ${missingEnvVars.join(', ')}. Please check your .env file.`
  );
}

if (!getApps().length) {
    app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    });
} else {
    // If an app is already initialized, get the existing one.
    // This prevents re-initialization errors.
    app = getApps()[0];
}

// Export a single, memoized Firestore instance for use across the server.
export const firestore: Firestore = getFirestore(app);
