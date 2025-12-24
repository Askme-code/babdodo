

// Note: Using string for dates to ensure serializability between Server and Client Components
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
  createdAt: string; 
  updatedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // Keep as string for serializability
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}
