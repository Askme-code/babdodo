'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import type { Post } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function AdminPostsPage() {
    const firestore = useFirestore();
    const postsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'news_updates'));
    }, [firestore]);
    
    const { data: posts, isLoading } = useCollection<Post>(postsQuery);
    
    const adaptedPosts = posts ? posts.map(p => ({...p, description: p.excerpt, type: 'post' })) : [];

    return (
        <CrudShell
            itemType="Post"
            items={adaptedPosts} 
            isPostType={true}
            isLoading={isLoading}
            onCreate={createPost}
            onUpdate={updatePost}
            onDelete={deletePost}
        />
    );
}
