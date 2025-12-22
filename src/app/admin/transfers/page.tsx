import CrudShell from '@/components/admin/crud-shell';
import { getServicesByType } from '@/lib/data';

export default function AdminTransfersPage() {
    const transfers = getServicesByType('transfer');

    return (
        <CrudShell
            itemType="Transfer"
            items={transfers}
            onCreate={async (item) => { console.log("Create transfer:", item); return true; }}
            onUpdate={async (id, item) => { console.log("Update transfer:", id, item); return true; }}
            onDelete={async (id) => { console.log("Delete transfer:", id); return true; }}
        />
    );
}
