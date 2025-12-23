import type { Service, Post } from './types';
import { initializeServerFirebase } from '@/firebase/server-init';
import { collection, getDocs } from 'firebase/firestore';

// This function is now responsible for fetching live data from Firestore
async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  // We use a server-side specific Firebase connection here.
  const { firestore } = initializeServerFirebase();
  const colRef = collection(firestore, collectionName);
  try {
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as T[];
  } catch (error) {
    console.error(`Failed to fetch collection ${collectionName}:`, error);
    // In case of error (e.g. permissions), return an empty array
    // to prevent the page from crashing.
    return [];
  }
}

export const getServicesByType = async (type: 'tour' | 'safari' | 'transfer'): Promise<Service[]> => {
  const allServices = await fetchCollection<Service>(`${type}s`);
  return allServices;
};

export const getFeaturedServices = async (type: 'tour' | 'safari' | 'transfer', count: number = 3): Promise<Service[]> => {
  const allServices = await getServicesByType(type);
  // In a real app, you might have a 'featured' flag in your data.
  // For now, we'll just take the first few items.
  return allServices.slice(0, count);
}

export const getAllServices = async (): Promise<Service[]> => {
    const tours = await getServicesByType('tour');
    const safaris = await getServicesByType('safari');
    const transfers = await getServicesByType('transfer');
    return [...tours, ...safaris, ...transfers];
};

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
    const allServices = await getAllServices();
    return allServices.find(service => service.slug === slug);
}

export const getAllPosts = async (): Promise<Post[]> => {
    return await fetchCollection<Post>('news_updates');
};

export const getFeaturedPosts = async (count: number = 3): Promise<Post[]> => {
    const allPosts = await getAllPosts();
    // In a real app, you might sort by date.
    return allPosts.slice(0, count);
}

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    const allPosts = await getAllPosts();
    return allPosts.find(post => post.slug === slug);
}
