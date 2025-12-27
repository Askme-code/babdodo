
'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, query, updateDoc, orderBy } from 'firebase/firestore';
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

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

export default function AdminReviewsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  // Temporarily disabling the query due to persistent permission errors.
  // const reviewsQuery = useMemoFirebase(() => {
  //   if (!firestore) return null;
  //   return query(collection(firestore, 'reviews'), orderBy('createdAt', 'desc'));
  // }, [firestore]);
  //
  // const { data: reviews, error, isLoading } = useCollection<Review>(reviewsQuery);
  //
  // const isPermissionError = error?.name === 'FirebaseError' && error.message.includes('permission-denied');

  const handleUpdateStatus = async (id: string, status: Review['status']) => {
    if (!firestore) return;
    try {
      const reviewRef = doc(firestore, 'reviews', id);
      await updateDoc(reviewRef, { status });
      toast({
        title: 'Review Updated',
        description: `The review has been ${status}.`,
      });
    } catch (e) {
      console.error('Failed to update review status:', e);
      toast({
        title: 'Error',
        description: 'Failed to update review status.',
        variant: 'destructive',
      });
    }
  };

  const renderTableBody = () => {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24">
            <Alert variant="destructive">
              <AlertTitle>Feature Temporarily Disabled</AlertTitle>
              <AlertDescription>The review management feature is currently unavailable due to an issue with deploying Firestore security rules. This is being investigated.</AlertDescription>
            </Alert>
          </TableCell>
        </TableRow>
      );
  };
  
  return (
    <div className="space-y-4">
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
