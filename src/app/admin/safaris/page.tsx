'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function AdminSafarisPage() {
    const firestore = useFirestore();
    const safarisQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'safaris'));
    }, [firestore]);

    const { data: safaris, isLoading } = useCollection<Service>(safarisQuery);
    
    return (
        <CrudShell
            itemType="Safari"
            items={safaris || []}
            isLoading={isLoading}
            onCreate={createSafari}
            onUpdate={updateSafari}
            onDelete={deleteSafari}
        />
    );
}
