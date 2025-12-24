'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createTransfer, updateTransfer, deleteTransfer } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminTransfersPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    
    const transfersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'transfers'));
    }, [firestore]);

    const { data: transfers, isLoading, error } = useCollection<Service>(transfersQuery);

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
            itemType="Transfer"
            items={transfers || []}
            isLoading={isLoading}
            loadingError={error}
            onGrantAdmin={grantAdminAccess}
            onCreate={createTransfer}
            onUpdate={updateTransfer}
            onDelete={deleteTransfer}
        />
    );
}
