'use client';

import CrudShell from '@/components/admin/crud-shell';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { createTransfer, updateTransfer, deleteTransfer } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { collection } from 'firebase/firestore';

export default function AdminTransfersPage() {
    const firestore = useFirestore();
    
    const transfersCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'transfers');
    }, [firestore]);

    const { data: transfers, isLoading } = useCollection<Service>(transfersCollection);

    if (isLoading) {
        return <div>Loading transfers...</div>;
    }

    return (
        <CrudShell
            itemType="Transfer"
            items={transfers || []}
            onCreate={createTransfer}
            onUpdate={updateTransfer}
            onDelete={deleteTransfer}
        />
    );
}
