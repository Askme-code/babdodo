
import type { Service, Post } from './types';
import { Timestamp } from 'firebase/firestore';

// This file contains functions to transform Firestore documents to our app's data types.

export const serviceFromDoc = (doc: { id: string, data: () => any }): Service => {
    const data = doc.data();
    if (!data) throw new Error('Document data is empty');

    // Convert Timestamps to ISO strings for serialization
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();
    const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : new Date().toISOString();

    return {
        id: doc.id,
        slug: data.slug || '',
        title: data.title || 'Untitled',
        description: data.description || '',
        longDescription: data.longDescription || '',
        price: data.price || 0,
        duration: data.duration || '',
        location: data.location || '',
        image: data.image || '',
        gallery: data.gallery || [],
        included: data.included || [],
        excluded: data.excluded || [],
        type: data.type || 'tour',
        featured: data.featured || false,
        createdAt: createdAt as any,
        updatedAt: updatedAt as any,
    };
};

export const postFromDoc = (doc: { id: string, data: () => any }): Post => {
    const data = doc.data();
    if (!data) throw new Error('Document data is empty');

    // Convert Timestamps to ISO strings for serialization
    const date = data.date?.toDate ? data.date.toDate().toISOString().split('T')[0] : data.date || new Date().toISOString().split('T')[0];
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();
    const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : new Date().toISOString();

    return {
        id: doc.id,
        slug: data.slug || '',
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        content: data.content || '',
        author: data.author || 'Admin',
        date: date,
        featuredImage: data.featuredImage || '',
        createdAt: createdAt as any,
        updatedAt: updatedAt as any,
    };
};
