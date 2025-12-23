'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { firestore } from '@/firebase/server-init';

export default async function AdminToursPage() {
    const toursSnapshot = await firestore.collection('tours').get();
    const tours = toursSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Service[];

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
