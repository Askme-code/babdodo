'use client';

import { 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc, 
    serverTimestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebase } from '@/firebase';
import type { Service, Post } from './types';
import { v4 as uuidv4 } from 'uuid';


const { firestore } = initializeFirebase();
const storage = getStorage();

const generateSlug = (title: string) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

const uploadImage = async (file: File, path: string): Promise<string> => {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
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
const createItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', item: (Partial<Service> | Partial<Post>) & { imageFile?: File }) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const collectionRef = collection(firestore, collectionPath);
    const slug = generateSlug(item.title!);
    
    let imageUrl: string | undefined = item.image || (item as Post).featuredImage;
    if (item.imageFile) {
        imageUrl = await uploadImage(item.imageFile, collectionPath);
    }
    
    const docData: any = {
      ...item,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    delete docData.imageFile; // Don't save the file object to Firestore

    if (itemType !== 'post') {
      docData.type = itemType;
      docData.image = imageUrl;
    } else {
        (docData as Partial<Post>).featuredImage = imageUrl;
        if (!docData.date) {
            docData.date = new Date().toISOString().split('T')[0];
        }
    }
    
    const docRef = await addDoc(collectionRef, docData);
    await updateDoc(docRef, { id: docRef.id });

    // Client-side revalidation is handled by page reload or state management
    return true;
  } catch (e: any) {
    console.error(`Failed to create ${itemType}:`, e);
    // You should emit a permission error here if that's the case
    return false;
  }
};

// Generic Update
const updateItem = async (itemType: 'tour' | 'safari' | 'transfer' | 'post', id: string, item: (Partial<Service> | Partial<Post>) & { imageFile?: File }) => {
  try {
    const collectionPath = getCollectionPathForType(itemType);
    const docRef = doc(firestore, collectionPath, id);
    const slug = generateSlug(item.title!);

    let imageUrl: string | undefined = item.image || (item as Post).featuredImage;
    if (item.imageFile) {
        imageUrl = await uploadImage(item.imageFile, collectionPath);
    }

    const docData: any = {
      ...item,
      slug,
      updatedAt: serverTimestamp(),
    };

    delete docData.imageFile;

     if (itemType === 'post') {
        docData.featuredImage = imageUrl;
        if (typeof docData.date === 'string') {
          docData.date = docData.date;
        }
    } else {
        docData.image = imageUrl;
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
export const createSafari = async (item: Partial<Service> & { imageFile?: File }) => createItem('safari', item);
export const updateSafari = async (id: string, item: Partial<Service> & { imageFile?: File }) => updateItem('safari', id, item);
export const deleteSafari = async (id: string) => deleteItem('safari', id);

// Tours
export const createTour = async (item: Partial<Service> & { imageFile?: File }) => createItem('tour', item);
export const updateTour = async (id: string, item: Partial<Service> & { imageFile?: File }) => updateItem('tour', id, item);
export const deleteTour = async (id: string) => deleteItem('tour', id);

// Transfers
export const createTransfer = async (item: Partial<Service> & { imageFile?: File }) => createItem('transfer', item);
export const updateTransfer = async (id:string, item: Partial<Service> & { imageFile?: File }) => updateItem('transfer', id, item);
export const deleteTransfer = async (id: string) => deleteItem('transfer', id);

// Posts
export const createPost = async (item: Partial<Post> & { imageFile?: File }) => createItem('post', item);
export const updatePost = async (id: string, item: Partial<Post> & { imageFile?: File }) => updateItem('post', id, item);
export const deletePost = async (id: string) => deleteItem('post', id);
