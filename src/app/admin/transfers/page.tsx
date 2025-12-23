'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createTransfer, updateTransfer, deleteTransfer } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { firestore } from '@/firebase/server-init';

export default async function AdminTransfersPage() {
    const transfersSnapshot = await firestore.collection('transfers').get();
    const transfers = transfersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Service[];

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
