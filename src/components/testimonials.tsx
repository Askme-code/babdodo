
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import type { Review } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ review }: { review: Review }) => (
  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
    <div className="p-1 h-full">
      <Card className="flex flex-col h-full">
        <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
          <Quote className="w-8 h-8 text-primary mb-4" />
          <p className="text-foreground/80 italic mb-4 flex-grow">"{review.comment}"</p>
          <StarRating rating={review.rating} />
          <p className="font-bold mt-2 text-foreground">{review.authorName}</p>
        </CardContent>
      </Card>
    </div>
  </CarouselItem>
);

const Testimonials = () => {
  const firestore = useFirestore();

  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'reviews'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(9)
    );
  }, [firestore]);

  const { data: reviews, isLoading, error } = useCollection<Review>(reviewsQuery);

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    );
  }
  
  // Do not render if there's a permission error, to avoid crashing the page.
  if (error || !reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Guest reviews will be shown here soon.</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {reviews.map((review) => (
          <TestimonialCard key={review.id} review={review} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Testimonials;
