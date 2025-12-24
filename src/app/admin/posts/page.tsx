'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import type { Post } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminPostsPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    
    const postsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'news_updates'));
    }, [firestore]);
    
    const { data: posts, isLoading, error } = useCollection<Post>(postsQuery);
    
    const adaptedPosts = posts ? posts.map(p => ({...p, description: p.excerpt, type: 'post' })) : [];

    const grantAdminAccess = async () => {
        if (!user || !firestore) return;
        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        await setDoc(adminRoleRef, {
            id: user.uid,
            role: 'admin',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        window.location.reload();
    };

    return (
        <CrudShell
            itemType="Post"
            items={adaptedPosts} 
            isPostType={true}
            isLoading={isLoading}
            loadingError={error}
            onGrantAdmin={grantAdminAccess}
            onCreate={createPost}
            onUpdate={updatePost}
            onDelete={deletePost}
        />
    );
}
