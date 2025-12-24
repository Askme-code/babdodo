import { firestore } from '@/firebase/server-init';
import type { Service, Post } from './types';
import { Timestamp } from 'firebase-admin/firestore';

const serviceFromDoc = (doc: FirebaseFirestore.DocumentSnapshot): Service => {
    const data = doc.data() as any;
    return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        price: data.price,
        duration: data.duration,
        location: data.location,
        image: data.image,
        gallery: data.gallery,
        included: data.included,
        excluded: data.excluded,
        type: data.type,
        featured: data.featured,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

const postFromDoc = (doc: FirebaseFirestore.DocumentSnapshot): Post => {
    const data = doc.data() as any;
    // Convert Firestore Timestamps to ISO strings for serialization
    const date = data.date instanceof Timestamp ? data.date.toDate().toISOString().split('T')[0] : data.date;
    
    return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        date: date,
        featuredImage: data.featuredImage,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

export const getServicesByType = async (type: 'tour' | 'safari' | 'transfer'): Promise<Service[]> => {
    try {
        const collectionPath = type === 'tour' ? 'tours' : type === 'safari' ? 'safaris' : 'transfers';
        const snapshot = await firestore.collection(collectionPath).orderBy('createdAt', 'desc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(serviceFromDoc);
    } catch (error) {
        console.error(`Error fetching services by type "${type}":`, error);
        return [];
    }
};

export const getFeaturedServices = async (type: 'tour' | 'safari' | 'transfer', count: number = 3): Promise<Service[]> => {
    try {
        const services = await getServicesByType(type);
        // Simple featured logic: take the most recent ones.
        // A real app might have a 'featured' boolean field to query.
        return services.slice(0, count);
    } catch (error) {
        console.error(`Error fetching featured services for "${type}":`, error);
        return [];
    }
}

export const getAllServices = async (): Promise<Service[]> => {
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
};

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
    try {
        const serviceCollections = ['tours', 'safaris', 'transfers'];
        for (const collectionName of serviceCollections) {
            const snapshot = await firestore.collection(collectionName).where('slug', '==', slug).limit(1).get();
            if (!snapshot.empty) {
                return serviceFromDoc(snapshot.docs[0]);
            }
        }
        return undefined;
    } catch (error) {
        console.error(`Error fetching service by slug "${slug}":`, error);
        return undefined;
    }
}

export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const snapshot = await firestore.collection('news_updates').orderBy('date', 'desc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(postFromDoc);
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return [];
    }
};

export const getFeaturedPosts = async (count: number = 3): Promise<Post[]> => {
    try {
        const posts = await getAllPosts();
        return posts.slice(0, count);
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return [];
    }
}

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    try {
        const snapshot = await firestore.collection('news_updates').where('slug', '==', slug).limit(1).get();
        if (snapshot.empty) {
            return undefined;
        }
        return postFromDoc(snapshot.docs[0]);
    } catch (error) {
        console.error(`Error fetching post by slug "${slug}":`, error);
        return undefined;
    }
}
