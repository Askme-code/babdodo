'use client';

import {
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
  initializeFirebase,
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { Service, Post } from './types';

// Do not initialize here, as it can be called before the provider is ready
// const { firestore } = initializeFirebase();

const getFirestoreInstance = () => {
    return initializeFirebase().firestore;
}

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

// Safaris
export const createSafari = async (item: Partial<Service>) => {
  try {
    const firestore = getFirestoreInstance();
    const safarisCollection = collection(firestore, 'safaris');
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(safarisCollection, { ...item, slug, type: 'safari' });
    return true;
  } catch (e) {
    return false;
  }
};
export const updateSafari = async (id: string, item: Partial<Service>) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'safaris', id);
    const slug = generateSlug(item.title!);
    updateDocumentNonBlocking(docRef, {...item, slug});
    return true;
  } catch (e) {
    return false;
  }
};
export const deleteSafari = async (id: string) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'safaris', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};

// Tours
export const createTour = async (item: Partial<Service>) => {
  try {
    const firestore = getFirestoreInstance();
    const toursCollection = collection(firestore, 'tours');
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(toursCollection, { ...item, slug, type: 'tour' });
    return true;
  } catch (e) {
    return false;
  }
};
export const updateTour = async (id: string, item: Partial<Service>) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'tours', id);
    const slug = generateSlug(item.title!);
    updateDocumentNonBlocking(docRef, {...item, slug});
    return true;
  } catch (e) {
    return false;
  }
};
export const deleteTour = async (id: string) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'tours', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};

// Transfers
export const createTransfer = async (item: Partial<Service>) => {
  try {
    const firestore = getFirestoreInstance();
    const transfersCollection = collection(firestore, 'transfers');
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(transfersCollection, { ...item, slug, type: 'transfer' });
    return true;
  } catch (e) {
    return false;
  }
};
export const updateTransfer = async (id: string, item: Partial<Service>) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'transfers', id);
    const slug = generateSlug(item.title!);
    updateDocumentNonBlocking(docRef, {...item, slug});
    return true;
  } catch (e) {
    return false;
  }
};
export const deleteTransfer = async (id: string) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'transfers', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};

// Posts
export const createPost = async (item: Partial<Post>) => {
  try {
    const firestore = getFirestoreInstance();
    const postsCollection = collection(firestore, 'news_updates');
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(postsCollection, { ...item, slug });
    return true;
  } catch (e) {
    return false;
  }
};
export const updatePost = async (id: string, item: Partial<Post>) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'news_updates', id);
    const slug = generateSlug(item.title!);
    updateDocumentNonBlocking(docRef, {...item, slug});
    return true;
  } catch (e) {
    return false;
  }
};
export const deletePost = async (id: string) => {
  try {
    const firestore = getFirestoreInstance();
    const docRef = doc(firestore, 'news_updates', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};