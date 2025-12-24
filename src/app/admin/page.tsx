'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Mountain,
  Ship,
  Car,
  Newspaper,
  DollarSign,
  Users,
  List,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Service, Post } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CombinedItem =
  | (Partial<Service> & { itemType: 'safari' | 'tour' | 'transfer' })
  | (Partial<Post> & { itemType: 'post' });

const getIconForItemType = (itemType: string) => {
  switch (itemType) {
    case 'safari':
      return <Mountain className="h-4 w-4" />;
    case 'tour':
      return <Ship className="h-4 w-4" />;
    case 'transfer':
      return <Car className="h-4 w-4" />;
    case 'post':
      return <Newspaper className="h-4 w-4" />;
    default:
      return <List className="h-4 w-4" />;
  }
};


const PermissionErrorAlert = ({ onGrant }: { onGrant: () => Promise<void> }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleGrantAccess = async () => {
        setIsSubmitting(true);
        try {
            await onGrant();
            toast({
                title: 'Access Granted!',
                description: 'Admin role has been assigned. Please refresh the page.',
            });
        } catch (error) {
            console.error('Failed to grant admin access', error);
            toast({
                title: 'Error',
                description: 'Could not assign admin role. Please check the console.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Alert variant="destructive" className="mb-6">
            <AlertTitle>Admin Permissions Required</AlertTitle>
            <AlertDescription>
                Your account does not have admin privileges. Granting access will allow you to manage all site content. This action only needs to be done once per admin user.
            </AlertDescription>
            <Button onClick={handleGrantAccess} disabled={isSubmitting} className="mt-4">
                {isSubmitting ? 'Granting...' : 'Make Me Admin'}
            </Button>
        </Alert>
    );
};


export default function AdminDashboardPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

    // Dummy data for stats
    const stats = {
        safaris: 0,
        tours: 0,
        transfers: 0,
        posts: 0,
        revenue: 12530,
        bookings: 42,
    };
    
    // Dummy data for recent activity
    const allRecentItems: CombinedItem[] = [];

    const grantAdminAccess = async () => {
        if (!user || !firestore) return;
        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        // Using non-blocking setDoc
        await setDoc(adminRoleRef, {
            id: user.uid,
            username: user.email,
            role: 'admin',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        setShowPermissionPrompt(false);
    };

    useEffect(() => {
        // This is a simple client-side check to suggest granting admin rights.
        // In a real app, this might be triggered by a failed data fetch.
        // For now, we'll just show the button if a user is logged in.
        if (user) {
            // A more robust check is needed, but this is a good starting point.
            // Let's assume if the prompt hasn't been dismissed, we show it.
            setShowPermissionPrompt(true);
        }
    }, [user]);

  return (
    <div className="space-y-8">
       <div>
         <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
         <p className="text-muted-foreground">An overview of your tours and safaris business.</p>
       </div>
       
       {showPermissionPrompt && <PermissionErrorAlert onGrant={grantAdminAccess} />}

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
                                    Last updated recently
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-sm">This section will show recent content changes once data is available.</p>
                )}
            </div>
        </CardContent>
       </Card>

    </div>
  );
}
