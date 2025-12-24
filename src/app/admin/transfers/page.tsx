'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createTransfer, updateTransfer, deleteTransfer } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function AdminTransfersPage() {
    const firestore = useFirestore();
    const transfersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'transfers'));
    }, [firestore]);

    const { data: transfers, isLoading } = useCollection<Service>(transfersQuery);

    return (
        <CrudShell
            itemType="Transfer"
            items={transfers || []}
            isLoading={isLoading}
            onCreate={createTransfer}
            onUpdate={updateTransfer}
            onDelete={deleteTransfer}
        />
    );
}
