'use client';

import CrudShell from '@/components/admin/crud-shell';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import type { Post } from '@/lib/types';
import { collection } from 'firebase/firestore';

export default function AdminPostsPage() {
    const firestore = useFirestore();

    const postsCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'news_updates');
    }, [firestore]);

    const { data: posts, isLoading } = useCollection<Post>(postsCollection);
    
    if (isLoading) {
        return <div>Loading posts...</div>;
    }
    
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
