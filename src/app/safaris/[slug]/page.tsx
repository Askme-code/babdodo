
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


type SafariPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function SafariPage({ params: paramsProp }: SafariPageProps) {
  const params = React.use(paramsProp);
  const firestore = useFirestore();

  const itemQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'safaris'), where('slug', '==', params.slug), limit(1));
  }, [firestore, params.slug]);

  const { data: items, isLoading } = useCollection<Service>(itemQuery);
  const safari = items?.[0];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isLoading && !safari) {
    notFound();
  }

  const mainImageUrl = safari.image || "https://picsum.photos/seed/safari-hero/1200/600";
  const galleryImages = safari.gallery || [];


  const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": safari.title,
      "description": safari.longDescription,
      "image": mainImageUrl,
      "provider": {
        "@type": "TravelAgency",
        "name": "Babdodo Tours & Safaris",
        "priceRange": "$$$"
      },
      "itinerary": {
          "@type": "ItemList",
          "itemListElement": safari.included?.map((item, index) => ({
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
        <Image
          src={mainImageUrl}
          alt={safari.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="safari landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative container h-full flex flex-col items-start justify-end pb-12 text-white px-4">
          <Badge variant="secondary" className="mb-2">Tanzania Safari</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold drop-shadow-lg">
            {safari.title}
          </h1>
        </div>
      </section>

      <div className="container py-8 md:py-16 px-4">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: safari.longDescription || '' }}>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-headline text-2xl text-primary mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {safari.included?.map((item, index) => (
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
                  {safari.excluded?.map((item, index) => (
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
                    <Image
                      key={index}
                      src={imgUrl}
                      alt={`${safari.title} gallery image ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover aspect-square"
                      data-ai-hint="safari gallery"
                    />
                  ))}
              </div>
            </div>
             <div className="mt-12">
              <ContentRecommender currentContent={safari.title} contentType="safari" />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg shadow-lg p-6">
                <h3 className="font-headline text-2xl">Safari Details</h3>
                <div className="space-y-4 mt-4 text-foreground/80">
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-bold text-2xl text-primary">${safari.price}</span>
                        <span className="ml-1">/ person</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-primary" />
                        <span>{safari.duration}</span>
                    </div>
                     <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                        <span>{safari.location}</span>
                    </div>
                </div>
                <Button size="lg" className="w-full mt-6">Book This Safari</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
