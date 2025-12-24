'use client';

import { useMemo } from 'react';
import { collection }from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import CrudShell from '@/components/admin/crud-shell';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';

export default function AdminToursPage() {
    const firestore = useFirestore();
    
    const toursCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'tours');
    }, [firestore]);

    const { data: tours, error, isLoading } = useCollection<Service>(toursCollection);

    return (
        <CrudShell
            itemType="Tour"
            items={tours || []}
            onCreate={createTour}
            onUpdate={updateTour}
            onDelete={deleteTour}
            error={error}
            isLoading={isLoading}
        />
    );
}
