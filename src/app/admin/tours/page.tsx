'use client';

import CrudShell from '@/components/admin/crud-shell';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { collection } from 'firebase/firestore';

export default function AdminToursPage() {
    const firestore = useFirestore();
    
    const toursCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'tours');
    }, [firestore]);
    
    const { data: tours, isLoading } = useCollection<Service>(toursCollection);

    if (isLoading) {
        return <div>Loading tours...</div>;
    }

    return (
        <CrudShell
            itemType="Tour"
            items={tours || []}
            onCreate={createTour}
            onUpdate={updateTour}
            onDelete={deleteTour}
        />
    );
}
