
'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import { firestore } from '@/firebase/server-init';
import { serviceFromDoc } from '@/lib/data-transforms';
import type { Service } from '@/lib/types';


async function getTours(): Promise<Service[]> {
    try {
        const snapshot = await firestore.collection('tours').orderBy('createdAt', 'desc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(serviceFromDoc);
    } catch(e) {
        console.error("Failed to fetch tours:", e);
        return [];
    }
}


export default async function AdminToursPage() {
    const tours = await getTours();

    return (
        <CrudShell
            itemType="Tour"
            items={tours}
            onCreate={createTour}
            onUpdate={updateTour}
            onDelete={deleteTour}
        />
    );
}
