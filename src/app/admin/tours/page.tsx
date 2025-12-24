'use client';

import CrudShell from '@/components/admin/crud-shell';
import { createTour, updateTour, deleteTour } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminToursPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const toursQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'tours'));
    }, [firestore]);
    
    const { data: tours, isLoading, error } = useCollection<Service>(toursQuery);

    const grantAdminAccess = async () => {
        if (!user || !firestore) return;
        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        await setDoc(adminRoleRef, {
            id: user.uid,
            role: 'admin',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        window.location.reload();
    };

    return (
        <CrudShell
            itemType="Tour"
            items={tours || []}
            isLoading={isLoading}
            loadingError={error}
            onGrantAdmin={grantAdminAccess}
            onCreate={createTour}
            onUpdate={updateTour}
            onDelete={deleteTour}
        />
    );
}
