
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Service, Post } from '@/lib/types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '../ui/skeleton';

type Item = Partial<Service> & Partial<Post> & { id?: string };

const serviceSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  longDescription: z.string().optional(),
  price: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    const num = Number(val);
    return isNaN(num) ? val : num;
  }, z.number({ invalid_type_error: 'Price must be a number.' }).positive('Price must be a positive number.').optional()),
  duration: z.string().optional(),
  location: z.string().optional(),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const postSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  author: z.string().optional(),
  date: z.string().optional(),
  featuredImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

interface CrudShellProps {
  itemType: string;
  items: Item[];
  isPostType?: boolean;
  isLoading: boolean;
  isPermissionError: boolean;
  onGrantAdminAccess: () => Promise<void>;
  onCreate: (item: Item) => Promise<boolean>;
  onUpdate: (id: string, item: Item) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
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
                Your account needs admin privileges to manage this content. Click the button below to grant access.
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

  const getInitialDate = () => {
    if (item?.date) {
        // Check if it's a Firestore Timestamp object
        if (typeof item.date === 'object' && 'toDate' in item.date) {
            return (item.date as any).toDate().toISOString().split('T')[0];
        }
        // Handle string date
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
            return d.toISOString().split('T')[0];
        }
    }
    // Default to today
    return new Date().toISOString().split('T')[0];
  };

  const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: item ? {
      ...item,
      date: getInitialDate(),
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

       <div>
        <Label htmlFor={isPostType ? 'featuredImage' : 'image'}>{isPostType ? 'Featured Image URL' : 'Main Image URL'}</Label>
        <Input id={isPostType ? 'featuredImage' : 'image'} {...register(isPostType ? 'featuredImage' : 'image')} placeholder="https://example.com/image.jpg" />
        {errors.image && <p className="text-destructive text-sm mt-1">{`${errors.image.message}`}</p>}
        {errors.featuredImage && <p className="text-destructive text-sm mt-1">{`${errors.featuredImage.message}`}</p>}
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

export default function CrudShell({ 
    itemType, 
    items, 
    isPostType = false,
    isLoading,
    isPermissionError,
    onGrantAdminAccess,
    onCreate, 
    onUpdate, 
    onDelete,
}: CrudShellProps) {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

  const handleFormSubmit = async (data: Item) => {
    try {
      let success = false;
      if (editingItem?.id) {
        success = await onUpdate(editingItem.id, data);
      } else {
        success = await onCreate(data);
      }

      if (success) {
        toast({ title: `${itemType} ${editingItem ? 'updated' : 'created'} successfully!` });
        setIsFormOpen(false);
        setEditingItem(undefined);
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      toast({ title: `Error`, description: `Failed to save ${itemType.toLowerCase()}. You may not have permissions.`, variant: 'destructive' });
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const success = await onDelete(id);
      if (success) {
        toast({ title: `${itemType} deleted successfully!` });
      } else {
        throw new Error('Deletion failed');
      }
    } catch(error) {
        toast({ title: 'Error', description: `Failed to delete ${itemType.toLowerCase()}.`, variant: 'destructive' });
    }
  };

  const renderTableBody = () => {
    if (isLoading) {
        return (
            [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                    <TableCell colSpan={isPostType ? 2 : 3}>
                        <Skeleton className="h-8 w-full" />
                    </TableCell>
                </TableRow>
            ))
        );
    }
    
    if (isPermissionError) {
      return (
         <TableRow>
            <TableCell colSpan={isPostType ? 2 : 3} className="text-center h-24">
              <p className="text-destructive">You don't have permission to view this content.</p>
            </TableCell>
          </TableRow>
      );
    }

    if (items.length === 0) {
       return (
         <TableRow>
            <TableCell colSpan={isPostType ? 2 : 3} className="text-center h-24">
              No {itemType.toLowerCase()}s found.
            </TableCell>
          </TableRow>
       );
    }

    return items.map((item) => (
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
    ));
  };


  return (
    <div className="space-y-4">
      {isPermissionError && <PermissionErrorAlert onGrant={onGrantAdminAccess} />}
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
            {renderTableBody()}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

    