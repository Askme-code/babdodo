
'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Service } from '@/lib/types';
import { useUser } from '@/firebase';
import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminToursPage() {
    const firestore = useFirestore();
    const { user } = useUser();
    
    const toursQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'tours'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: tours, error, isLoading } = useCollection<Service>(toursQuery);

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

    const handleCreate = async (item: Partial<Service>) => {
        const success = await createTour(item);
        if (success) window.location.reload();
        return success;
    };

    const handleUpdate = async (id: string, item: Partial<Service>) => {
        const success = await updateTour(id, item);
        if (success) window.location.reload();
        return success;
    };
    
    const handleDelete = async (id: string) => {
        const success = await deleteTour(id);
        if (success) window.location.reload();
        return success;
    };

    return (
        <CrudShell
            itemType="Tour"
            items={tours || []}
            isLoading={isLoading}
            isPermissionError={isPermissionError}
            onGrantAdminAccess={grantAdminAccess}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}
