
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Check, Clock, MapPin, DollarSign, UserCheck } from 'lucide-react';
import Link from 'next/link';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useEffect, useState } from 'react';
import type { Service } from '@/lib/types';


type TransferPageProps = {
  params: {
    slug: string;
  };
};

async function getServiceRefBySlug(firestore: any, slug: string, type: string) {
    const servicesRef = collection(firestore, `${type}s`);
    const q = query(servicesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
}


const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 h-5 w-5"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

export default function TransferPage({ params }: TransferPageProps) {
  const firestore = useFirestore();
  const [itemRef, setItemRef] = useState(null);

  useEffect(() => {
    if (firestore) {
        getServiceRefBySlug(firestore, params.slug, 'transfer').then(setItemRef);
    }
  }, [firestore, params.slug]);

  const { data: transfer, isLoading } = useDoc<Service>(itemRef);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!transfer) {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(p => p.id === transfer.image);
  const phoneNumber = "255678575092";
  const message = `Hello! I'm interested in booking the ${transfer.title} transfer.`;

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
            <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: transfer.longDescription || '' }}>
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
                <div className="mt-6 flex flex-col gap-2">
                    <Button size="lg" asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                        <Link href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon />
                            Book on WhatsApp
                        </Link>
                    </Button>
                    <Button size="lg" asChild variant="outline">
                         <Link href="/contact">Book Online!</Link>
                    </Button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
