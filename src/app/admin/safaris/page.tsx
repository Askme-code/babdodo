'use server';

import CrudShell from '@/components/admin/crud-shell';
import { createSafari, updateSafari, deleteSafari } from '@/lib/firebase-actions';
import type { Service } from '@/lib/types';
import { firestore } from '@/firebase/server-init';


export default async function AdminSafarisPage() {
    const safarisSnapshot = await firestore.collection('safaris').get();
    const safaris = safarisSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Service[];
    
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
