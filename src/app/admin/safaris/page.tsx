
'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Service } from '@/lib/types';
import { useUser } from '@/firebase';
import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminSafarisPage() {
    const firestore = useFirestore();
    const { user } = useUser();
    
    const safarisQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'safaris'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: safaris, error, isLoading } = useCollection<Service>(safarisQuery);

    const isPermissionError = !!error;

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

    const handleCreate = async (item: Partial<Service>) => {
        const success = await createSafari(item);
        if (success) window.location.reload(); // Force reload on success
        return success;
    };

    const handleUpdate = async (id: string, item: Partial<Service>) => {
        const success = await updateSafari(id, item);
        if (success) window.location.reload(); // Force reload on success
        return success;
    };
    
    const handleDelete = async (id: string) => {
        const success = await deleteSafari(id);
        if (success) window.location.reload();
        return success;
    };


    return (
        <CrudShell
            itemType="Safari"
            items={safaris || []}
            isLoading={isLoading}
            isPermissionError={isPermissionError}
            onGrantAdminAccess={grantAdminAccess}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}

    