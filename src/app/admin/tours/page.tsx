'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function AdminToursPage() {
    const firestore = useFirestore();
    const toursQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'tours'));
    }, [firestore]);
    
    const { data: tours, isLoading } = useCollection<Service>(toursQuery);

    return (
        <CrudShell
            itemType="Tour"
            items={tours || []}
            isLoading={isLoading}
            onCreate={createTour}
            onUpdate={updateTour}
            onDelete={deleteTour}
        />
    );
}
