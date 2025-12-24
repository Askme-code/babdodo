'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Service, Post } from '@/lib/types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';


type Item = Partial<Service> & Partial<Post>;

const serviceSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  longDescription: z.string().optional(),
  price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive().optional()),
  duration: z.string().optional(),
  location: z.string().optional(),
});

const postSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  author: z.string().optional(),
  date: z.string().optional(),
});

interface CrudShellProps {
  itemType: string;
  items: Item[];
  isPostType?: boolean;
  onCreate: (item: Item) => Promise<boolean>;
  onUpdate: (id: string, item: Item) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  error?: Error | null;
  isLoading?: boolean;
}

const PermissionErrorAlert = ({ onGrant }: { onGrant: () => Promise<void> }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleGrantAccess = async () => {
        setIsSubmitting(true);
        try {
            await onGrant();
            toast({
                title: 'Access Granted!',
                description: 'Admin role has been assigned. The page will now reload.',
            });
            setTimeout(() => window.location.reload(), 2000);
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
                Your account does not have admin privileges to view this content. Granting access will allow you to manage all site content. This action only needs to be done once.
            </AlertDescription>
            <Button onClick={handleGrantAccess} disabled={isSubmitting} className="mt-4">
                {isSubmitting ? 'Granting...' : 'Make Me Admin'}
            </Button>
        </Alert>
    );
};


const CrudForm = ({
  item,
  isPostType,
  onSubmit,
  closeDialog
}: {
  item?: Item;
  isPostType?: boolean;
  onSubmit: (data: any) => void;
  closeDialog: () => void;
}) => {
  const schema = isPostType ? postSchema : serviceSchema;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: item ? {
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    } : {
      date: new Date().toISOString().split('T')[0]
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-destructive text-sm mt-1">{`${errors.title.message}`}</p>}
      </div>

      {isPostType ? (
        <>
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" {...register('excerpt')} />
            {errors.excerpt && <p className="text-destructive text-sm mt-1">{`${errors.excerpt.message}`}</p>}
          </div>
          <div>
            <Label htmlFor="content">Content (Markdown/HTML supported)</Label>
            <Textarea id="content" {...register('content')} className="min-h-[200px]" />
            {errors.content && <p className="text-destructive text-sm mt-1">{`${errors.content.message}`}</p>}
          </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...register('author')} />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...register('date')} />
              </div>
           </div>
        </>
      ) : (
        <>
           <div>
            <Label htmlFor="description">Short Description</Label>
            <Textarea id="description" {...register('description')} />
            {errors.description && <p className="text-destructive text-sm mt-1">{`${errors.description.message}`}</p>}
          </div>
          <div>
            <Label htmlFor="longDescription">Long Description (Overview)</Label>
            <Textarea id="longDescription" {...register('longDescription')} className="min-h-[150px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" {...register('price')} />
              {errors.price && <p className="text-destructive text-sm mt-1">{`${errors.price.message}`}</p>}
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register('duration')} />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register('location')} />
          </div>
        </>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
      </div>
    </form>
  );
};

export default function CrudShell({ itemType, items, isPostType = false, onCreate, onUpdate, onDelete, error, isLoading }: CrudShellProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

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
  };

  const handleFormSubmit = async (data: Item) => {
    try {
      let success = false;
      if (editingItem?.id) {
        success = await onUpdate(editingItem.id, data);
      } else {
        success = await onCreate(data);
      }

      if (success) {
        toast({ title: `${itemType} ${editingItem ? 'updated' : 'created'} successfully! Refreshing...` });
        setIsFormOpen(false);
        setEditingItem(undefined);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      toast({ title: `Error`, description: `Failed to save ${itemType.toLowerCase()}.`, variant: 'destructive' });
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const success = await onDelete(id);
      if (success) {
        toast({ title: `${itemType} deleted successfully! Refreshing...` });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        throw new Error('Deletion failed');
      }
    } catch(error) {
        toast({ title: 'Error', description: `Failed to delete ${itemType.toLowerCase()}.`, variant: 'destructive' });
    }
  };

  const hasPermissionError = error?.message.includes('Missing or insufficient permissions');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Manage {itemType}s</h1>
            <p className="text-muted-foreground">A list of all {itemType.toLowerCase()}s in your business.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) setEditingItem(undefined);
        }}>
          <DialogTrigger asChild>
             <Button onClick={() => setEditingItem(undefined)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add {itemType}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} {itemType}</DialogTitle>
            </DialogHeader>
            <CrudForm
              item={editingItem}
              isPostType={isPostType}
              onSubmit={handleFormSubmit}
              closeDialog={() => {
                setIsFormOpen(false);
                setEditingItem(undefined);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {hasPermissionError && <PermissionErrorAlert onGrant={grantAdminAccess} />}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              {!isPostType && <TableHead>Price</TableHead>}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
                <TableRow>
                    <TableCell colSpan={isPostType ? 2 : 3} className="h-24 text-center">
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </TableCell>
                </TableRow>
            ) : !hasPermissionError && items && items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  {!isPostType && <TableCell>${item.price}</TableCell>}
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingItem(item);
                          setIsFormOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this {itemType.toLowerCase()}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id!)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isPostType ? 2 : 3} className="text-center h-24">
                   {!hasPermissionError && `No ${itemType.toLowerCase()}s found.`}
                   {hasPermissionError && 'Permissions required to view content.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
