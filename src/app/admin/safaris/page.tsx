
'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import { firestore } from '@/firebase/server-init';
import { serviceFromDoc } from '@/lib/data-transforms';
import type { Service } from '@/lib/types';


async function getSafaris(): Promise<Service[]> {
    try {
        const snapshot = await firestore.collection('safaris').orderBy('createdAt', 'desc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(serviceFromDoc);
    } catch(e) {
        console.error("Failed to fetch safaris:", e);
        return [];
    }
}


export default async function AdminSafarisPage() {
    const safaris = await getSafaris();

    return (
        <CrudShell
            itemType="Safari"
            items={safaris}
            onCreate={createSafari}
            onUpdate={updateSafari}
            onDelete={deleteSafari}
        />
    );
}
