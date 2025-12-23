'use server';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Mountain, Ship, Car, Newspaper, DollarSign, Users, List, Plus, Edit, Trash, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { firestore } from '@/firebase/server-init';
import type { Service, Post } from '@/lib/types';
import { getServicesByType, getFeaturedPosts } from '@/lib/data';


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

async function getStats() {
    const safaris = await firestore.collection('safaris').get();
    const tours = await firestore.collection('tours').get();
    const transfers = await firestore.collection('transfers').get();
    const posts = await firestore.collection('news_updates').get();

    return {
        safaris: safaris.size,
        tours: tours.size,
        transfers: transfers.size,
        posts: posts.size,
        // Static data for now
        revenue: 12530,
        bookings: 42,
    };
}


async function getRecentActivity() {
    const recentSafarisQuery = firestore.collection('safaris').orderBy('updatedAt', 'desc').limit(5);
    const recentToursQuery = firestore.collection('tours').orderBy('updatedAt', 'desc').limit(5);
    const recentTransfersQuery = firestore.collection('transfers').orderBy('updatedAt', 'desc').limit(5);
    const recentPostsQuery = firestore.collection('news_updates').orderBy('updatedAt', 'desc').limit(5);

    const [safarisSnap, toursSnap, transfersSnap, postsSnap] = await Promise.all([
        recentSafarisQuery.get(),
        recentToursQuery.get(),
        recentTransfersQuery.get(),
        recentPostsQuery.get(),
    ]);

    const recentSafaris = safarisSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Service[];
    const recentTours = toursSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Service[];
    const recentTransfers = transfersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Service[];
    const recentPosts = postsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Post[];

    const allRecentItems: CombinedItem[] = [
        ...recentSafaris.map(item => ({ ...item, itemType: 'safari' as const })),
        ...recentTours.map(item => ({ ...item, itemType: 'tour' as const })),
        ...recentTransfers.map(item => ({ ...item, itemType: 'transfer' as const })),
        ...recentPosts.map(item => ({ ...item, itemType: 'post' as const })),
    ].sort((a, b) => (b.updatedAt as any)._seconds - (a.updatedAt as any)._seconds).slice(0, 5);

    return allRecentItems;
}


export default async function AdminDashboardPage() {
    const stats = await getStats();
    const allRecentItems = await getRecentActivity();

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
                                    Last updated {item.updatedAt ? new Date((item.updatedAt as any)._seconds * 1000).toLocaleString() : 'recently'}
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
