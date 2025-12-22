import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Check, Clock, MapPin, DollarSign, UserCheck } from 'lucide-react';

import { getServiceBySlug, getAllServices } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';

type TransferPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: TransferPageProps): Promise<Metadata> {
  const transfer = getServiceBySlug(params.slug);
  if (!transfer) {
    return {
      title: 'Transfer Not Found',
    };
  }
  return {
    title: transfer.title,
    description: transfer.description,
  };
}

export async function generateStaticParams() {
  const services = getAllServices().filter(s => s.type === 'transfer');
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default function TransferPage({ params }: TransferPageProps) {
  const transfer = getServiceBySlug(params.slug);

  if (!transfer || transfer.type !== 'transfer') {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(p => p.id === transfer.image);

  return (
    <div className="bg-background">
      <section className="relative h-[50vh] w-full">
        <Image
          src={mainImage?.imageUrl || ''}
          alt={transfer.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={mainImage?.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container h-full flex flex-col items-start justify-end pb-12 text-white">
          <Badge variant="secondary" className="mb-2">Transfer Service</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            {transfer.title}
          </h1>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-foreground/90">
                <h2 className="font-headline text-3xl text-primary">Transfer Overview</h2>
                <p>{transfer.longDescription}</p>
            </div>
            
            <div className="mt-12">
              <h3 className="font-headline text-2xl text-primary mb-4">Service Features</h3>
              <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Private, air-conditioned vehicle for your group.</span>
                  </li>
                  <li className="flex items-start">
                    <UserCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Professional, English-speaking driver.</span>
                  </li>
                   <li className="flex items-start">
                    <Clock className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Flight tracking and flexible pickup times.</span>
                  </li>
              </ul>
            </div>
             <div className="mt-12">
              <ContentRecommender currentContent={transfer.title} contentType="transfer" />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg shadow-lg p-6">
                <h3 className="font-headline text-2xl">Transfer Details</h3>
                <div className="space-y-4 mt-4 text-foreground/80">
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-bold text-2xl text-primary">${transfer.price}</span>
                        <span className="ml-1">/ vehicle</span>
                    </div>
                     <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                        <span>{transfer.location}</span>
                    </div>
                </div>
                <Button size="lg" className="w-full mt-6">Book This Transfer</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
