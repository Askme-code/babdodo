import CrudShell from '@/components/admin/crud-shell';
import { getAllPosts } from '@/lib/data';

export default function AdminPostsPage() {
    const posts = getAllPosts();

    return (
        <CrudShell
            itemType="Post"
            items={posts.map(p => ({...p, description: p.excerpt, type: 'post' }))} // Adapt Post to fit CrudShell item type
            isPostType={true}
            onCreate={async (item) => { console.log("Create post:", item); return true; }}
            onUpdate={async (id, item) => { console.log("Update post:", id, item); return true; }}
            onDelete={async (id) => { console.log("Delete post:", id); return true; }}
        />
    );
}
