
'use client';

import * as React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Check, X, Clock, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';
import { JsonLd } from '@/components/JsonLd';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import type { Service } from '@/lib/types';
import MediaRenderer from '@/components/MediaRenderer';


type TourPageProps = {
  params: {
    slug: string;
  };
};

export default function TourPage({ params }: TourPageProps) {
  const firestore = useFirestore();

  const itemQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'tours'), where('slug', '==', params.slug), limit(1));
  }, [firestore, params.slug]);

  const { data: items, isLoading } = useCollection<Service>(itemQuery);
  const tour = items?.[0];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !tour) {
    notFound();
  }

  const mainImageUrl = tour.image || "https://picsum.photos/seed/tour-hero/1200/600";
  const galleryImages = tour.gallery || [];


  const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": tour.title,
      "description": tour.longDescription,
      "image": mainImageUrl,
      "provider": {
        "@type": "TravelAgency",
        "name": "Babdodo Tours & Safaris",
        "priceRange": "$$"
      },
      "itinerary": {
          "@type": "ItemList",
          "itemListElement": tour.included?.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item
          }))
      }
  };

  return (
    <>
    <JsonLd data={jsonLdData} />
    <div className="bg-background">
      <section className="relative h-[50vh] w-full">
        <MediaRenderer
          src={mainImageUrl}
          alt={tour.title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
          data-ai-hint="zanzibar tour"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative container h-full flex flex-col items-start justify-end pb-12 text-white px-4">
          <Badge variant="secondary" className="mb-2">Zanzibar Tour</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold drop-shadow-lg">
            {tour.title}
          </h1>
        </div>
      </section>

      <div className="container py-8 md:py-16 px-4">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: tour.longDescription || '' }}>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-headline text-2xl text-primary mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {tour.included?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-headline text-2xl text-primary mb-4">What's Excluded</h3>
                 <ul className="space-y-2">
                  {tour.excluded?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                       <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

             <div className="mt-12">
              <h3 className="font-headline text-2xl text-primary mb-4">Photo Gallery</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((imgUrl, index) => (
                    <MediaRenderer
                      key={index}
                      src={imgUrl}
                      alt={`${tour.title} gallery image ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover aspect-square"
                      data-ai-hint="tour gallery"
                    />
                  ))}
              </div>
            </div>
             <div className="mt-12">
              <ContentRecommender currentContent={tour.title} contentType="tour" />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg shadow-lg p-6">
                <h3 className="font-headline text-2xl">Tour Details</h3>
                <div className="space-y-4 mt-4 text-foreground/80">
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-bold text-2xl text-primary">${tour.price}</span>
                        <span className="ml-1">/ person</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-primary" />
                        <span>{tour.duration}</span>
                    </div>
                     <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                        <span>{tour.location}</span>
                    </div>
                </div>
                <Button size="lg" className="w-full mt-6">Book This Tour</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
