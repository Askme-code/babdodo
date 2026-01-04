
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

// Define a type for our hardcoded review structure
interface HardcodedReview {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
}

const hardcodedReviews: HardcodedReview[] = [
  {
    id: 1,
    authorName: 'Jessica L',
    rating: 5,
    comment: "An absolutely unforgettable experience! The safari was perfectly organized, and our guide was incredibly knowledgeable. Seeing the Big Five was a dream come true. Highly recommend Babdodo Tours!",
  },
  {
    id: 2,
    authorName: 'Mark T.',
    rating: 5,
    comment: "The Zanzibar tour was magical. From the history of Stone Town to the crystal clear waters of Mnemba Island, everything was seamless. The team is so friendly and professional. Thank you!",
  },
  {
    id: 3,
    authorName: 'Emily & John',
    rating: 5,
    comment: "We booked our airport transfer and a full-day tour with Babdodo, and we couldn't be happier. The driver was punctual and the car was comfortable. It made our arrival completely stress-free.",
  },
  {
    id: 4,
    authorName: 'David P.',
    rating: 5,
    comment: "A truly authentic and well-planned safari. The accommodations were fantastic, and the food was delicious. Our guide went above and beyond to make sure we had the best views of the wildlife.",
  },
  {
    id: 5,
    authorName: 'Sarah K.',
    rating: 5,
    comment: "Safari Blue was the highlight of our trip to Zanzibar! The crew was amazing, the seafood lunch was incredible, and the snorkeling spots were breathtaking. A must-do tour!",
  },
  {
    id: 6,
    authorName: 'Michael B.',
    rating: 5,
    comment: "Professional, reliable, and so much fun. The team at Babdodo really knows how to create a special experience. We felt safe and well-cared-for throughout our entire trip.",
  }
];


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

const TestimonialCard = ({ review }: { review: HardcodedReview }) => (
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
            
            <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full mt-8"
            >
            <CarouselContent className="-ml-8">
                {hardcodedReviews.map((review) => (
                    <TestimonialCard key={review.id} review={review} />
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
        </div>
    </section>
  );
};

export default Testimonials;
