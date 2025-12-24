
'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createTransfer, updateTransfer, deleteTransfer } from '@/lib/firebase-actions';
import { firestore } from '@/firebase/server-init';
import { serviceFromDoc } from '@/lib/data-transforms';
import type { Service } from '@/lib/types';

async function getTransfers(): Promise<Service[]> {
    try {
        const snapshot = await firestore.collection('transfers').orderBy('createdAt', 'desc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(serviceFromDoc);
    } catch(e) {
        console.error("Failed to fetch transfers:", e);
        return [];
    }
}


export default async function AdminTransfersPage() {
    const transfers = await getTransfers();

    return (
        <CrudShell
            itemType="Transfer"
            items={transfers}
            onCreate={createTransfer}
            onUpdate={updateTransfer}
            onDelete={deleteTransfer}
        />
    );
}
