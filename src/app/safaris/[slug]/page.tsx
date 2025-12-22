import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Check, X, Clock, MapPin, DollarSign } from 'lucide-react';

import { getServiceBySlug, getAllServices } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';

type SafariPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: SafariPageProps): Promise<Metadata> {
  const safari = getServiceBySlug(params.slug);
  if (!safari) {
    return {
      title: 'Safari Not Found',
    };
  }
  return {
    title: safari.title,
    description: safari.description,
  };
}

export async function generateStaticParams() {
  const services = getAllServices().filter(s => s.type === 'safari');
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default function SafariPage({ params }: SafariPageProps) {
  const safari = getServiceBySlug(params.slug);

  if (!safari || safari.type !== 'safari') {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(p => p.id === safari.image);

  return (
    <div className="bg-background">
      <section className="relative h-[50vh] w-full">
        <Image
          src={mainImage?.imageUrl || ''}
          alt={safari.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={mainImage?.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container h-full flex flex-col items-start justify-end pb-12 text-white">
          <Badge variant="secondary" className="mb-2">Tanzania Safari</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            {safari.title}
          </h1>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-foreground/90">
                <h2 className="font-headline text-3xl text-primary">Safari Overview</h2>
                <p>{safari.longDescription}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-headline text-2xl text-primary mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {safari.included.map((item, index) => (
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
                  {safari.excluded.map((item, index) => (
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
                {safari.gallery.map((imgId, index) => {
                  const img = PlaceHolderImages.find(p => p.id === imgId);
                  return (
                    <Image
                      key={index}
                      src={img?.imageUrl || ''}
                      alt={`${safari.title} gallery image ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover aspect-square"
                      data-ai-hint={img?.imageHint}
                    />
                  );
                })}
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
  );
}
