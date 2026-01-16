

// Note: Using string for dates to ensure serializability between Server and Client Components
export interface Service {
  id: string;
  slug?: string;
  title: string;
  description: string;
  longDescription?: string;
  pricePerPerson?: number;
  priceGroup?: number;
  duration?: string;
  location?: string;
  image?: string; // URL string
  gallery?: string[]; // Array of URL strings
  highlights?: string[];
  included?: string[];
  excluded?:string[];
  type: 'tour' | 'safari' | 'transfer';
  featured?: boolean;
  maxPeople?: number;
  rating?: number;
  createdAt: string; 
  updatedAt: string;
}

export interface Post {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // Keep as string for serializability
  featuredImage?: string; // URL string
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number; // 1-5
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

    