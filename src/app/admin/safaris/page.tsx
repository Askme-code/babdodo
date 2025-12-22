'use client';

import CrudShell from '@/components/admin/crud-shell';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { collection } from 'firebase/firestore';

export default function AdminSafarisPage() {
    const firestore = useFirestore();
    
    const safarisCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'safaris');
    }, [firestore]);

    const { data: safaris, isLoading } = useCollection<Service>(safarisCollection);
    
    if (isLoading) {
        return <div>Loading safaris...</div>;
    }

    return (
        <CrudShell
            itemType="Safari"
            items={safaris || []}
            onCreate={createSafari}
            onUpdate={updateSafari}
            onDelete={deleteSafari}
        />
    );
}
