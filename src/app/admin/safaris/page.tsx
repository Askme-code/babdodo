'use client';

import { useMemo } from 'react';
import { collection }from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import CrudShell from '@/components/admin/crud-shell';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';

export default function AdminSafarisPage() {
    const firestore = useFirestore();
    
    const safarisCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'safaris');
    }, [firestore]);

    const { data: safaris, error, isLoading } = useCollection<Service>(safarisCollection);
    
    return (
        <CrudShell
            itemType="Safari"
            items={safaris || []}
            onCreate={createSafari}
            onUpdate={updateSafari}
            onDelete={deleteSafari}
            error={error}
            isLoading={isLoading}
        />
    );
}
