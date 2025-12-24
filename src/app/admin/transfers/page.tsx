'use client';

import { useMemo } from 'react';
import { collection }from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import CrudShell from '@/components/admin/crud-shell';
import { createTransfer, updateTransfer, deleteTransfer } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';

export default function AdminTransfersPage() {
    const firestore = useFirestore();

    const transfersCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'transfers');
    }, [firestore]);
    
    const { data: transfers, error, isLoading } = useCollection<Service>(transfersCollection);

    return (
        <CrudShell
            itemType="Transfer"
            items={transfers || []}
            onCreate={createTransfer}
            onUpdate={updateTransfer}
            onDelete={deleteTransfer}
            error={error}
            isLoading={isLoading}
        />
    );
}
