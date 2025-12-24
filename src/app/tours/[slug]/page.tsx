
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Check, X, Clock, MapPin, DollarSign } from 'lucide-react';

import { getServiceBySlug, getAllServices } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';
import { JsonLd } from '@/components/JsonLd';


type TourPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const tour = await getServiceBySlug(params.slug);
  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  const mainImage = PlaceHolderImages.find(p => p.id === tour.image);

  return {
    title: `${tour.title} - Zanzibar Tour`,
    description: tour.description,
    openGraph: {
        title: tour.title,
        description: tour.description,
        type: 'article',
        images: [
            {
                url: mainImage?.imageUrl || '',
                width: 1200,
                height: 630,
                alt: tour.title,
            }
        ]
    }
  };
}

export async function generateStaticParams() {
  const services = await getAllServices();
  const tours = services.filter(s => s.type === 'tour');
  return tours.map(service => ({
    slug: service.slug,
  }));
}

export default async function TourPage({ params }: TourPageProps) {
  const tour = await getServiceBySlug(params.slug);

  if (!tour || tour.type !== 'tour') {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(p => p.id === tour.image);
  const galleryImages = tour.gallery ? tour.gallery.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean) : [];


  const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": tour.title,
      "description": tour.longDescription,
      "image": mainImage?.imageUrl || '',
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
        <Image
          src={mainImage?.imageUrl || ''}
          alt={tour.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={mainImage?.imageHint}
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
            <div className="prose prose-lg max-w-none text-foreground/90">
                <h2 className="font-headline text-3xl text-primary">Tour Overview</h2>
                <p>{tour.longDescription}</p>
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
                {galleryImages.map((img, index) => (
                    img && <Image
                      key={index}
                      src={img.imageUrl}
                      alt={`${tour.title} gallery image ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover aspect-square"
                      data-ai-hint={img.imageHint}
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
