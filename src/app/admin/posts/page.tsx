'use client';

import { useMemo } from 'react';
import { collection }from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import CrudShell from '@/components/admin/crud-shell';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import type { Post } from '@/lib/types';

export default function AdminPostsPage() {
    const firestore = useFirestore();
    
    const postsCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'news_updates');
    }, [firestore]);

    const { data: posts, error, isLoading } = useCollection<Post>(postsCollection);
    
    const adaptedPosts = posts ? posts.map(p => ({...p, description: p.excerpt, type: 'post' })) : [];

    return (
        <CrudShell
            itemType="Post"
            items={adaptedPosts} 
            isPostType={true}
            onCreate={createPost}
            onUpdate={updatePost}
            onDelete={deletePost}
            error={error}
            isLoading={isLoading}
        />
    );
}
