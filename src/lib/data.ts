
'use server';

import { firestore } from '@/firebase/server-init';
import { serviceFromDoc, postFromDoc } from './data-transforms';
import type { Service, Post } from './types';
import { unstable_cache } from 'next/cache';

const CACHE_REVALIDATION_TIME = 3600; // 1 hour in seconds

export const getServicesByType = unstable_cache(
    async (type: 'tour' | 'safari' | 'transfer'): Promise<Service[]> => {
        try {
            const collectionPath = type === 'tour' ? 'tours' : type === 'safari' ? 'safaris' : 'transfers';
            const snapshot = await firestore.collection(collectionPath).orderBy('createdAt', 'desc').get();
            if (snapshot.empty) return [];
            return snapshot.docs.map(serviceFromDoc);
        } catch (error) {
            console.error(`Error fetching services by type "${type}":`, error);
            return []; // Return empty array on error
        }
    },
    ['services-by-type'],
    { revalidate: CACHE_REVALIDATION_TIME }
);

export const getFeaturedServices = unstable_cache(
    async (type: 'tour' | 'safari' | 'transfer', count: number = 3): Promise<Service[]> => {
        try {
            const collectionPath = type === 'tour' ? 'tours' : type === 'safari' ? 'safaris' : 'transfers';
            
            // A real app might have a 'featured' boolean field to query.
            let snapshot = await firestore.collection(collectionPath).where('featured', '==', true).limit(count).get();

            // Fallback if no "featured" items are found
            if (snapshot.empty) {
                snapshot = await firestore.collection(collectionPath).orderBy('createdAt', 'desc').limit(count).get();
            }

            if (snapshot.empty) return [];
            return snapshot.docs.map(serviceFromDoc);
        } catch (error) {
            console.error(`Error fetching featured services for "${type}":`, error);
            return [];
        }
    },
    ['featured-services'],
    { revalidate: CACHE_REVALIDATION_TIME }
);


export const getAllServices = unstable_cache(
    async (): Promise<Service[]> => {
        try {
            const tours = getServicesByType('tour');
            const safaris = getServicesByType('safari');
            const transfers = getServicesByType('transfer');
            const [tourDocs, safariDocs, transferDocs] = await Promise.all([tours, safaris, transfers]);
            return [...tourDocs, ...safariDocs, ...transferDocs];
        } catch (error) {
            console.error("Error fetching all services:", error);
            return [];
        }
    },
    ['all-services'],
    { revalidate: CACHE_REVALIDATION_TIME }
);

export const getServiceBySlug = unstable_cache(
    async (slug: string): Promise<Service | null> => {
        try {
            const serviceCollections = ['tours', 'safaris', 'transfers'];
            for (const collectionName of serviceCollections) {
                const snapshot = await firestore.collection(collectionName).where('slug', '==', slug).limit(1).get();
                if (!snapshot.empty) {
                    return serviceFromDoc(snapshot.docs[0]);
                }
            }
            return null;
        } catch (error) {
            console.error(`Error fetching service by slug "${slug}":`, error);
            return null;
        }
    },
    ['service-by-slug'],
    { revalidate: CACHE_REVALIDATION_TIME }
);

export const getAllPosts = unstable_cache(
    async (): Promise<Post[]> => {
        try {
            const snapshot = await firestore.collection('news_updates').orderBy('date', 'desc').get();
            if (snapshot.empty) return [];
            return snapshot.docs.map(postFromDoc);
        } catch (error) {
            console.error("Error fetching all posts:", error);
            return [];
        }
    },
    ['all-posts'],
    { revalidate: CACHE_REVALIDATION_TIME }
);


export const getFeaturedPosts = unstable_cache(
    async (count: number = 3): Promise<Post[]> => {
        try {
            const snapshot = await firestore.collection('news_updates').orderBy('date', 'desc').limit(count).get();
            if (snapshot.empty) return [];
            return snapshot.docs.map(postFromDoc);
        } catch (error) {
            console.error("Error fetching featured posts:", error);
            return [];
        }
    },
    ['featured-posts'],
    { revalidate: CACHE_REVALIDATION_TIME }
);

export const getPostBySlug = unstable_cache(
    async (slug: string): Promise<Post | null> => {
        try {
            const snapshot = await firestore.collection('news_updates').where('slug', '==', slug).limit(1).get();
            if (snapshot.empty) {
                return null;
            }
            return postFromDoc(snapshot.docs[0]);
        } catch (error) {
            console.error(`Error fetching post by slug "${slug}":`, error);
            return null;
        }
    },
    ['post-by-slug'],
    { revalidate: CACHE_REVALIDATION_TIME }
);
