import CrudShell from '@/components/admin/crud-shell';
import { getServicesByType } from '@/lib/data';

export default function AdminSafarisPage() {
    const safaris = getServicesByType('safari');

    return (
        <CrudShell
            itemType="Safari"
            items={safaris}
            onCreate={async (item) => { console.log("Create safari:", item); return true; }}
            onUpdate={async (id, item) => { console.log("Update safari:", id, item); return true; }}
            onDelete={async (id) => { console.log("Delete safari:", id); return true; }}
        />
    );
}
