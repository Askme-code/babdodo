// IMPORTANT: This file should only be used on the server.
// It is not meant to be used in client components.

import { initializeApp, getApps, getApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config'; 

// These are memoized, so they will only run once.
let adminApp: App | null = null;
let firestore: Firestore | null = null;

function getFirebaseAdminApp() {
    if (adminApp) {
        return adminApp;
    }

    if (getApps().some(app => app.name === 'admin')) {
        adminApp = getApp('admin');
        return adminApp;
    }

    // In a production App Hosting environment, the GOOGLE_APPLICATION_CREDENTIALS
    // environment variable is automatically set. In a local environment, you may
    // need to set this yourself.
    adminApp = initializeApp({
        projectId: firebaseConfig.projectId,
    }, 'admin');

    return adminApp;
}


export function initializeServerFirebase() {
    if (firestore) {
        return { firestore };
    }
    const app = getFirebaseAdminApp();
    firestore = getFirestore(app);
    return { firestore };
}
