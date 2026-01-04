
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ review }: { review: Review }) => (
  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
    <div className="p-4 h-full">
      <Card className="flex flex-col h-full p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
        <CardContent className="relative flex flex-col p-0 flex-grow">
          <Quote className="w-12 h-12 text-primary/10 absolute -top-4 -right-4" />
          <div className="flex items-center gap-4 mb-4">
             <Avatar>
                <AvatarImage src={`https://picsum.photos/seed/${review.authorName}/100/100`} alt={review.authorName} />
                <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold font-headline text-lg">{review.authorName}</p>
                 {/* <p className="text-sm text-muted-foreground">New York, USA</p> */}
            </div>
          </div>
          <StarRating rating={review.rating} />
          <p className="text-foreground/80 italic mt-4 flex-grow">"{review.comment}"</p>
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

  if (error || (!isLoading && (!reviews || reviews.length === 0))) {
    // Silently fail and don't render the component if there's an error or no reviews.
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-card">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <p className="font-semibold text-primary uppercase tracking-wider">Trusted by Travellers</p>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mt-2">What Our Guests Say</h2>
                <p className="mt-4 text-muted-foreground">
                    Hear directly from the people who experienced the magic of Africa with Babdodo Tours & Safaris.
                </p>
            </div>
            
            {isLoading ? (
                 <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl hidden lg:block" />
                </div>
            ) : (
                <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full mt-8"
                >
                <CarouselContent className="-ml-8">
                    {reviews?.map((review) => (
                    <TestimonialCard key={review.id} review={review} />
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4" />
                <CarouselNext className="hidden md:flex -right-4" />
                </Carousel>
            )}
        </div>
    </section>
  );
};

export default Testimonials;
