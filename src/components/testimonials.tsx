
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

  const { data: reviews, isLoading } = useCollection<Review>(reviewsQuery);

  if (isLoading) {
    return (
        <div className="container py-12 md:py-20">
             <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">What Our Guests Say</h2>
            <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
                Real stories from travelers who have explored with us.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return null; // Don't render the section if there are no approved reviews
  }

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">What Our Guests Say</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Real stories from travelers who have explored with us.
        </p>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto mt-12"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;

    