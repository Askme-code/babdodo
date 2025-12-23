'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Mountain, Ship, Car, Newspaper, DollarSign, Users, List, Plus, Edit, Trash, ShieldCheck } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, orderBy, limit, doc } from 'firebase/firestore';
import type { Service, Post } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';


type CombinedItem = (Partial<Service> & { itemType: 'safari' | 'tour' | 'transfer' }) | (Partial<Post> & { itemType: 'post' });


const getIconForItemType = (itemType: string) => {
    switch (itemType) {
        case 'safari': return <Mountain className="h-4 w-4" />;
        case 'tour': return <Ship className="h-4 w-4" />;
        case 'transfer': return <Car className="h-4 w-4" />;
        case 'post': return <Newspaper className="h-4 w-4" />;
        default: return <List className="h-4 w-4" />;
    }
};

const getActionIcon = (action: 'create' | 'update' | 'delete') => {
    switch (action) {
        case 'create': return <Plus className="h-4 w-4 text-green-500" />;
        case 'update': return <Edit className="h-4 w-4 text-blue-500" />;
        case 'delete': return <Trash className="h-4 w-4 text-red-500" />;
        default: return null;
    }
}


export default function AdminDashboardPage() {
    const firestore = useFirestore();
    const { user } = useUser();
    const { toast } = useToast();

    const safarisCollection = useMemoFirebase(() => firestore ? collection(firestore, 'safaris') : null, [firestore]);
    const toursCollection = useMemoFirebase(() => firestore ? collection(firestore, 'tours') : null, [firestore]);
    const transfersCollection = useMemoFirebase(() => firestore ? collection(firestore, 'transfers') : null, [firestore]);
    const postsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'news_updates') : null, [firestore]);

    const { data: safaris, isLoading: loadingSafaris, error: safarisError } = useCollection<Service>(safarisCollection);
    const { data: tours, isLoading: loadingTours } = useCollection<Service>(toursCollection);
    const { data: transfers, isLoading: loadingTransfers } = useCollection<Service>(transfersCollection);
    const { data: posts, isLoading: loadingPosts } = useCollection<Post>(postsCollection);
    
    const recentSafarisQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'safaris'), orderBy('updatedAt', 'desc'), limit(5)) : null, [firestore]);
    const recentToursQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'tours'), orderBy('updatedAt', 'desc'), limit(5)) : null, [firestore]);
    const recentTransfersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'transfers'), orderBy('updatedAt', 'desc'), limit(5)) : null, [firestore]);
    const recentPostsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'news_updates'), orderBy('updatedAt', 'desc'), limit(5)) : null, [firestore]);

    const { data: recentSafaris } = useCollection<Service>(recentSafarisQuery);
    const { data: recentTours } = useCollection<Service>(recentToursQuery);
    const { data: recentTransfers } = useCollection<Service>(recentTransfersQuery);
    const { data: recentPosts } = useCollection<Post>(recentPostsQuery);


    const stats = {
        safaris: safaris?.length ?? 0,
        tours: tours?.length ?? 0,
        transfers: transfers?.length ?? 0,
        posts: posts?.length ?? 0,
        // Static data for now
        revenue: 12530,
        bookings: 42,
    };
    
    const allRecentItems: CombinedItem[] = [
        ...(recentSafaris || []).map(item => ({ ...item, itemType: 'safari' as const })),
        ...(recentTours || []).map(item => ({ ...item, itemType: 'tour' as const })),
        ...(recentTransfers || []).map(item => ({ ...item, itemType: 'transfer' as const })),
        ...(recentPosts || []).map(item => ({ ...item, itemType: 'post' as const })),
    ].sort((a, b) => (b.updatedAt as any) - (a.updatedAt as any)).slice(0, 5);
    
    const handleMakeAdmin = () => {
        if (!user || !firestore) {
            toast({
                title: 'Error',
                description: 'User not logged in or Firestore not available.',
                variant: 'destructive',
            });
            return;
        }

        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        const adminData = {
            id: user.uid,
            username: user.email,
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setDocumentNonBlocking(adminRoleRef, adminData, { merge: true });

        toast({
            title: 'Success!',
            description: `Admin role granted to ${user.email}. Please refresh the page.`,
        });
    };
    
    if (safarisError) {
        return (
            <div className="container mx-auto p-8 text-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-destructive">Permission Denied</CardTitle>
                        <CardDescription>
                            You do not have sufficient permissions to view this content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            To access the admin dashboard, you need to be an administrator. Click the button below to grant admin privileges to your current account ({user?.email}).
                        </p>
                        <Button onClick={handleMakeAdmin}>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Make Me Admin
                        </Button>
                         <p className="text-xs text-muted-foreground mt-4">
                            Note: After clicking, you may need to refresh the page for the changes to take effect.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }


  return (
    <div className="space-y-8">
       <div>
         <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
         <p className="text-muted-foreground">An overview of your tours and safaris business.</p>
       </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Safaris</CardTitle>
            <Mountain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.safaris}</div>
            <p className="text-xs text-muted-foreground">Managed safaris</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tours}</div>
            <p className="text-xs text-muted-foreground">Managed tours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.transfers}</div>
            <p className="text-xs text-muted-foreground">Managed transfers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.bookings}</div>
            <p className="text-xs text-muted-foreground">+12.2% from last month</p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>The latest updates to your content.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {allRecentItems.length > 0 ? (
                    allRecentItems.map((item) => (
                        <div key={`${item.itemType}-${item.id}`} className="flex items-center gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>{getIconForItemType(item.itemType)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    <span className="capitalize">{item.itemType}</span>: <Link href={`/admin/${item.itemType}s`} className="hover:underline">{item.title}</Link>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Last updated {item.updatedAt ? new Date((item.updatedAt as any).seconds * 1000).toLocaleString() : 'recently'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-sm">No recent activity to display.</p>
                )}
            </div>
        </CardContent>
       </Card>

    </div>
  );
}
