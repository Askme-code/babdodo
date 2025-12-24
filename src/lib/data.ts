// This file is being temporarily modified to prevent server-side data fetching
// due to environment variable issues with the Firebase Admin SDK.
// We will rely on client-side fetching instead.

import type { Service, Post } from './types';

// These functions will now return empty arrays to prevent build failures.
// The actual data will be fetched on the client.

export const getServicesByType = async (type: 'tour' | 'safari' | 'transfer'): Promise<Service[]> => {
  return [];
};

export const getFeaturedServices = async (type: 'tour' | 'safari' | 'transfer', count: number = 3): Promise<Service[]> => {
  return [];
}

export const getAllServices = async (): Promise<Service[]> => {
    return [];
};

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
    return undefined;
}

export const getAllPosts = async (): Promise<Post[]> => {
    return [];
};

export const getFeaturedPosts = async (count: number = 3): Promise<Post[]> => {
    return [];
}

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    return undefined;
}
