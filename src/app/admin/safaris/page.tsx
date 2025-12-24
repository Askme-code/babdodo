'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminSafarisPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const safarisQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'safaris'));
    }, [firestore]);

    const { data: safaris, isLoading, error } = useCollection<Service>(safarisQuery);

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
            itemType="Safari"
            items={safaris || []}
            isLoading={isLoading}
            loadingError={error}
            onGrantAdmin={grantAdminAccess}
            onCreate={createSafari}
            onUpdate={updateSafari}
            onDelete={deleteSafari}
        />
    );
}
