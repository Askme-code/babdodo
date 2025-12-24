
'use client';

// This file is intended for client-side data fetching utilities.
// We are using a client-side approach to avoid server-initialization errors.

// Note: The unstable_cache function is for Server Components and will not be used here.

import type { Service, Post } from './types';

// In this client-side architecture, data fetching is performed directly within components
// using hooks like `useCollection` from Firebase. Therefore, this file will be primarily for
// type definitions and transformations that can be used on the client.

// A placeholder function to illustrate that server-side fetching is disabled.
export const getServicesByType = async (type: 'tour' | 'safari' | 'transfer'): Promise<Service[]> => {
    console.warn("Client-side data fetching is active. getServicesByType should not be called from the server.");
    return [];
};

export const getFeaturedServices = async (type: 'tour' | 'safari' | 'transfer', count: number = 3): Promise<Service[]> => {
    console.warn("Client-side data fetching is active. getFeaturedServices should not be called from the server.");
    return [];
};

export const getAllServices = async (): Promise<Service[]> => {
     console.warn("Client-side data fetching is active. getAllServices should not be called from the server.");
    return [];
};

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
    console.warn("Client-side data fetching is active. getServiceBySlug should not be called from the server.");
    return null;
};

export const getAllPosts = async (): Promise<Post[]> => {
    console.warn("Client-side data fetching is active. getAllPosts should not be called from the server.");
    return [];
}

export const getFeaturedPosts = async (count: number = 3): Promise<Post[]> => {
    console.warn("Client-side data fetching is active. getFeaturedPosts should not be called from the server.");
    return [];
}

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    console.warn("Client-side data fetching is active. getPostBySlug should not be called from the server.");
    return null;
}
