// IMPORTANT: This file should only be used on the server.
// It is not meant to be used in client components.

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config'; 

function getFirebaseAdminApp() {
    if (getApps().some(app => app.name === 'admin')) {
        return getApp('admin');
    }

    // In a production App Hosting environment, the GOOGLE_APPLICATION_CREDENTIALS
    // environment variable is automatically set. In a local environment, you may
    // need to set this yourself.
    return initializeApp({
        projectId: firebaseConfig.projectId,
    }, 'admin');
}


export function initializeServerFirebase() {
    const app = getFirebaseAdminApp();
    return {
        firestore: getFirestore(app)
    };
}
