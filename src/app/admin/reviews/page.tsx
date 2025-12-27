
'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc, query, updateDoc, orderBy, setDoc, serverTimestamp } from 'firebase/firestore';
import type { Review } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { updateReview } from '@/lib/firebase-actions';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

const getBadgeVariant = (status: Review['status']) => {
  switch (status) {
    case 'approved':
      return 'default';
    case 'rejected':
      return 'destructive';
    case 'pending':
    default:
      return 'secondary';
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
                Your account needs admin privileges to manage reviews. This might be because you just signed up. Click the button below to grant access.
            </AlertDescription>
            <Button onClick={handleGrantAccess} disabled={isSubmitting} className="mt-4">
                {isSubmitting ? 'Granting...' : 'Grant Admin Access'}
            </Button>
        </Alert>
    );
};


export default function AdminReviewsPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  
  // For now, we are disabling review fetching to prevent crashes.
  const reviews: Review[] = [];
  const isLoading = false;
  const isPermissionError = false;


  const handleUpdateStatus = async (id: string, status: Review['status']) => {
    const success = await updateReview(id, { status });
    if (success) {
      toast({
        title: 'Review Updated',
        description: `The review has been ${status}.`,
      });
    } else {
      toast({
        title: 'Update Failed',
        description: 'Could not update the review status. You may lack permissions.',
        variant: 'destructive',
      });
    }
  };

  const grantAdminAccess = async () => {
      if (!user || !firestore) return;
      const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
      await setDoc(adminRoleRef, {
          id: user.uid,
          username: user.email,
          role: 'admin',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
      });
      window.location.reload();
  };

  const renderTableBody = () => {
    if (isLoading) {
      return [...Array(3)].map((_, i) => (
        <TableRow key={i}>
          <TableCell colSpan={5}>
            <Skeleton className="h-8 w-full" />
          </TableCell>
        </TableRow>
      ));
    }
    
    return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24">
            Review management is temporarily unavailable due to a persistent permission issue.
          </TableCell>
        </TableRow>
      );
  };
  
  return (
    <div className="space-y-4">
      {isPermissionError && <PermissionErrorAlert onGrant={grantAdminAccess} />}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Manage Reviews</h1>
          <p className="text-muted-foreground">Approve or reject customer reviews.</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableBody()}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
