
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import { createReview } from '@/lib/firebase-actions';
import type { Review } from '@/lib/types';
import { cn } from '@/lib/utils';

const reviewSchema = z.object({
  authorName: z.string().min(2, 'Name must be at least 2 characters.'),
  rating: z.number().min(1, 'Please select a rating.'),
  comment: z.string().min(10, 'Comment must be at least 10 characters.'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const StarRatingInput = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1"
          >
            <Star
              className={cn(
                'w-6 h-6 transition-colors',
                ratingValue <= (hoverRating || value)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};


export default function ReviewForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const reviewData: Partial<Review> = {
        ...data,
        status: 'pending',
      };
      const success = await createReview(reviewData);

      if (success) {
        toast({
          title: 'Review Submitted!',
          description: 'Thank you for your feedback. Your review is pending approval.',
        });
        reset();
        onSuccess?.();
      } else {
        throw new Error('Failed to submit review.');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="authorName">Your Name</Label>
        <Input id="authorName" {...register('authorName')} placeholder="John D." />
        {errors.authorName && <p className="text-destructive text-sm mt-1">{errors.authorName.message}</p>}
      </div>

      <div>
        <Label>Your Rating</Label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => <StarRatingInput value={field.value} onChange={field.onChange} />}
        />
        {errors.rating && <p className="text-destructive text-sm mt-1">{errors.rating.message}</p>}
      </div>

      <div>
        <Label htmlFor="comment">Your Review</Label>
        <Textarea id="comment" {...register('comment')} placeholder="What did you like or dislike?" />
        {errors.comment && <p className="text-destructive text-sm mt-1">{errors.comment.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
