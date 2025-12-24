
'use server';
// IMPORTANT: This file should only be used on the server.
// It is not meant to be used in client components.
import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

// Import the service account key from the JSON file.
// Make sure the path is correct. It should be at the root of your project.
import serviceAccount from '../../serviceAccountKey.json';

let app: App;

// This is a robust, server-safe pattern for initializing the Firebase Admin SDK.
// It ensures the app is initialized only once, preventing errors in hot-reload
// and serverless environments.

if (!getApps().length) {
    try {
        // Cast the imported JSON to the required credential type.
        const credential = cert(serviceAccount as any);

        app = initializeApp({
            credential,
        });
    } catch (e: any) {
        console.error("Firebase Admin Init Error:", e.message);
        throw new Error(`Failed to initialize Firebase Admin SDK from serviceAccountKey.json. Error: ${e.message}`);
    }
} else {
    // If an app is already initialized, get the existing one.
    app = getApps()[0];
}

// Export a single, memoized Firestore instance for use across the server.
export const firestore: Firestore = getFirestore(app);
