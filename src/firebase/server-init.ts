// IMPORTANT: This file should only be used on the server.
// It is not meant to be used in client components.
import { initializeApp, getApps, getApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    projectId: firebaseConfig.projectId,
  });
} else {
  app = getApp();
}

const firestore: Firestore = getFirestore(app);

export function initializeServerFirebase() {
  return { firestore };
}
