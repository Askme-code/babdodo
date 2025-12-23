'use server';

import { revalidatePath } from 'next/cache';
import { firestore } from '@/firebase/server-init';
import { FieldValue } from 'firebase-admin/firestore';
import type { Service, Post } from './types';

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
const createItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', item: Partial<Service> | Partial<Post>) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const collectionRef = firestore.collection(collectionPath);
    const slug = generateSlug(item.title!);
    
    const docData: any = {
      ...item,
      slug,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (itemType !== 'post') {
      docData.type = itemType;
    }

    const docRef = await collectionRef.add(docData);
    await docRef.update({ id: docRef.id });

    revalidatePath(`/admin/${collectionPath}`);
    return true;
  } catch (e) {
    console.error(`Failed to create ${itemType}:`, e);
    return false;
  }
};

// Generic Update
const updateItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', id: string, item: Partial<Service> | Partial<Post>) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const docRef = firestore.collection(collectionPath).doc(id);
    const slug = generateSlug(item.title!);

    const docData: any = {
      ...item,
      slug,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await docRef.update(docData);
    revalidatePath(`/admin/${collectionPath}`);
    revalidatePath(`/${collectionPath}/${slug}`);
    return true;
  } catch (e) {
    console.error(`Failed to update ${itemType}:`, e);
    return false;
  }
};

// Generic Delete
const deleteItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', id: string) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const docRef = firestore.collection(collectionPath).doc(id);
    await docRef.delete();
    revalidatePath(`/admin/${collectionPath}`);
    return true;
  } catch (e) {
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
export const updateTransfer = async (id: string, item: Partial<Service>) => updateItem('transfer', id, item);
export const deleteTransfer = async (id: string) => deleteItem('transfer', id);

// Posts
export const createPost = async (item: Partial<Post>) => createItem('post', item);
export const updatePost = async (id: string, item: Partial<Post>) => updateItem('post', id, item);
export const deletePost = async (id: string) => deleteItem('post', id);
