'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import type { Post } from '@/lib/types';
import { firestore } from '@/firebase/server-init';

export default async function AdminPostsPage() {
    const postsSnapshot = await firestore.collection('news_updates').get();
    const posts = postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Post[];
    
    const adaptedPosts = posts.map(p => ({...p, description: p.excerpt, type: 'post' }));

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
