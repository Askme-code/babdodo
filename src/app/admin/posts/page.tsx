
'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import { firestore } from '@/firebase/server-init';
import { postFromDoc } from '@/lib/data-transforms';
import type { Post } from '@/lib/types';


async function getPosts(): Promise<Post[]> {
    try {
        const snapshot = await firestore.collection('news_updates').orderBy('date', 'desc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(postFromDoc);
    } catch(e) {
        console.error("Failed to fetch posts:", e);
        // In case of error (e.g. permissions), return empty array.
        // The CrudShell can be enhanced to show a specific error state.
        return [];
    }
}


export default async function AdminPostsPage() {
    const posts = await getPosts();
    const adaptedPosts = posts ? posts.map(p => ({...p, description: p.excerpt, type: 'post' })) : [];

    return (
        <CrudShell
            itemType="Post"
            items={adaptedPosts} 
            isPostType={true}
            onCreate={createPost}
            onUpdate={updatePost}
            onDelete={deletePost}
        />
    );
}
