import type { Timestamp } from 'firebase/firestore';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  duration?: string;
  location?: string;
  image?: string;
  gallery?: string[];
  included?: string[];
  excluded?:string[];
  type: 'tour' | 'safari' | 'transfer';
  featured?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  featuredImage?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
