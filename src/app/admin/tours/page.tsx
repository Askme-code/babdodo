import CrudShell from '@/components/admin/crud-shell';
import { getServicesByType } from '@/lib/data';

export default function AdminToursPage() {
    const tours = getServicesByType('tour');
    // In a real app, you would fetch this from Supabase.

    return (
        <CrudShell
            itemType="Tour"
            items={tours}
            // In a real app, these actions would call Supabase.
            // For now, they will just log to the console.
            onCreate={async (item) => { console.log("Create tour:", item); return true; }}
            onUpdate={async (id, item) => { console.log("Update tour:", id, item); return true; }}
            onDelete={async (id) => { console.log("Delete tour:", id); return true; }}
        />
    );
}
