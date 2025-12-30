
'use client';
import type { Metadata } from 'next';
import ServiceCard from '@/components/service-card';
import Image from 'next/image';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Service } from '@/lib/types';


// export const metadata: Metadata = {
//   title: 'Zanzibar Tours',
//   description: 'Explore the best tours Zanzibar has to offer, from spice farms to historic Stone Town.',
// };

const ToursPage = () => {
  const firestore = useFirestore();

  const toursQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'tours'), orderBy('createdAt', 'desc'));
  }, [firestore]);
  const { data: tours } = useCollection<Service>(toursQuery);


  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <Image
            src="/image/local-boats.jpg"
            alt="Zanzibar local boats"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full flex flex-col items-center justify-center text-center text-white">
           <div className="p-2 bg-primary text-primary-foreground rounded-full mb-4">
              <Image src="/image/logo.jpg" alt="Babdodo Tours Logo" width={40} height={40} className="rounded-full" />
            </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Zanzibar Tours</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Immerse yourself in the culture, history, and natural beauty of the Spice Island.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours?.map(tour => (
              <ServiceCard key={tour.id} service={tour} />
            ))}
          </div>
           {tours?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No tours available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ToursPage;
