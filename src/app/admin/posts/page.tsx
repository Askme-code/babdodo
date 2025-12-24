
'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createPost, updatePost, deletePost } from '@/lib/firebase-actions';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Post } from '@/lib/types';
import { useUser } from '@/firebase';
import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';


export default function AdminPostsPage() {
    const firestore = useFirestore();
    const { user } = useUser();

    const postsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'news_updates'), orderBy('date', 'desc'));
    }, [firestore]);

    const { data: posts, error, isLoading } = useCollection<Post>(postsQuery);
    const adaptedPosts = posts ? posts.map(p => ({...p, description: p.excerpt, type: 'post' })) : [];

    const isPermissionError = error?.name === 'FirebaseError' && error.message.includes('permission-denied');
    
    const grantAdminAccess = async () => {
        if (!user || !firestore) return;
        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        await setDoc(adminRoleRef, {
            id: user.uid,
            username: user.email,
            role: 'admin',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        window.location.reload();
    };

    const handleCreate = async (item: Partial<Post>) => {
        const success = await createPost(item);
        if (success) window.location.reload();
        return success;
    };

    const handleUpdate = async (id: string, item: Partial<Post>) => {
        const success = await updatePost(id, item);
        if (success) window.location.reload();
        return success;
    };
    
    const handleDelete = async (id: string) => {
        const success = await deletePost(id);
        if (success) window.location.reload();
        return success;
    };


    return (
        <CrudShell
            itemType="Post"
            items={adaptedPosts} 
            isPostType={true}
            isLoading={isLoading}
            isPermissionError={isPermissionError}
            onGrantAdminAccess={grantAdminAccess}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}
