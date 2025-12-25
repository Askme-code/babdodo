
'use client';

import { 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc, 
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Service, Post } from './types';

const { firestore } = initializeFirebase();

const generateSlug = (title: string) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

const getCollectionPathForType = (itemType: 'tour' | 'safari' | 'transfer' | 'post') => {
    switch (itemType) {
        case 'tour': return 'tours';
        case 'safari': return 'safaris';
        case 'transfer': return 'transfers';
        case 'post': return 'news_updates';
    }
}

// Generic Create
const createItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', item: (Partial<Service> | Partial<Post>)) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const collectionRef = collection(firestore, collectionPath);
    const slug = generateSlug(item.title!);
    
    const docData: any = {
      ...item,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    if (itemType !== 'post') {
      docData.type = itemType;
    } else {
        if (!docData.date) {
            docData.date = new Date().toISOString().split('T')[0];
        }
        // Convert date string to Timestamp for Firestore
        if (typeof docData.date === 'string') {
            docData.date = Timestamp.fromDate(new Date(docData.date));
        }
    }
    
    const docRef = await addDoc(collectionRef, docData);
    await updateDoc(docRef, { id: docRef.id });

    return true;
  } catch (e: any) {
    console.error(`Failed to create ${itemType}:`, e);
    return false;
  }
};

// Generic Update
const updateItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', id: string, item: (Partial<Service> | Partial<Post>)) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const docRef = doc(firestore, collectionPath, id);
    
    const docData: any = {
      ...item,
      updatedAt: serverTimestamp(),
    };

    // Only generate a new slug if the title is being changed
    if (item.title) {
        docData.slug = generateSlug(item.title);
    }

     if (itemType === 'post' && typeof docData.date === 'string') {
        // Convert date string to Timestamp for Firestore
        docData.date = Timestamp.fromDate(new Date(docData.date));
    }

    await updateDoc(docRef, docData);
    
    return true;
  } catch (e: any) {
    console.error(`Failed to update ${itemType}:`, e);
    return false;
  }
};

// Generic Delete
const deleteItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', id: string) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const docRef = doc(firestore, collectionPath, id);
    await deleteDoc(docRef);
    return true;
  } catch (e: any) {
    console.error(`Failed to delete ${itemType}:`, e);
    return false;
  }
};


// Safaris
export const createSafari = async (item: Partial<Service>) => createItem('safari', item);
export const updateSafari = async (id: string, item: Partial<Service>) => updateItem('safari', id, item);
export const deleteSafari = async (id: string) => deleteItem('safari', id);

// Tours
export const createTour = async (item: Partial<Service>) => createItem('tour', item);
export const updateTour = async (id: string, item: Partial<Service>) => updateItem('tour', id, item);
export const deleteTour = async (id: string) => deleteItem('tour', id);

// Transfers
export const createTransfer = async (item: Partial<Service>) => createItem('transfer', item);
export const updateTransfer = async (id:string, item: Partial<Service>) => updateItem('transfer', id, item);
export const deleteTransfer = async (id: string) => deleteItem('transfer', id);

// Posts
export const createPost = async (item: Partial<Post>) => createItem('post', item);
export const updatePost = async (id: string, item: Partial<Post>) => updateItem('post', id, item);
export const deletePost = async (id: string) => deleteItem('post', id);
