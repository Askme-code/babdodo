'use client';

import {
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
  getSdks,
  initializeFirebase,
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { Service, Post } from './types';

// Initialize Firebase and get SDKs
const { firestore } = initializeFirebase();

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

// Safaris
const safarisCollection = collection(firestore, 'safaris');
export const createSafari = async (item: Partial<Service>) => {
  try {
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(safarisCollection, { ...item, slug, type: 'safari' });
    return true;
  } catch (e) {
    return false;
  }
};
export const updateSafari = async (id: string, item: Partial<Service>) => {
  try {
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
    const docRef = doc(firestore, 'safaris', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};

// Tours
const toursCollection = collection(firestore, 'tours');
export const createTour = async (item: Partial<Service>) => {
  try {
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(toursCollection, { ...item, slug, type: 'tour' });
    return true;
  } catch (e) {
    return false;
  }
};
export const updateTour = async (id: string, item: Partial<Service>) => {
  try {
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
    const docRef = doc(firestore, 'tours', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};

// Transfers
const transfersCollection = collection(firestore, 'transfers');
export const createTransfer = async (item: Partial<Service>) => {
  try {
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(transfersCollection, { ...item, slug, type: 'transfer' });
    return true;
  } catch (e) {
    return false;
  }
};
export const updateTransfer = async (id: string, item: Partial<Service>) => {
  try {
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
    const docRef = doc(firestore, 'transfers', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};

// Posts
const postsCollection = collection(firestore, 'news_updates');
export const createPost = async (item: Partial<Post>) => {
  try {
    const slug = generateSlug(item.title!);
    await addDocumentNonBlocking(postsCollection, { ...item, slug });
    return true;
  } catch (e) {
    return false;
  }
};
export const updatePost = async (id: string, item: Partial<Post>) => {
  try {
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
    const docRef = doc(firestore, 'news_updates', id);
    deleteDocumentNonBlocking(docRef);
    return true;
  } catch (e) {
    return false;
  }
};
