
'use client';
import type { Metadata } from 'next';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Service } from '@/lib/types';
import ServiceCard from '@/components/service-card';
import { DollarSign, Smile, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// export const metadata: Metadata = {
//   title: 'Airport Transfers',
//   description: 'Reliable and comfortable airport transfers in Zanzibar and mainland Tanzania.',
// };

const popularRoutes = [
    { to: 'Jambiani' },
    { to: 'Paje' },
    { to: 'Michamvi' },
    { to: 'Kiwengwa' },
    { to: 'Matemwe' },
    { to: 'Stone Town' },
    { to: 'Kendwa' },
    { to: 'Nungwi' },
];

const transportTypes = [
  {
    id: "transport-alphard",
    name: "Toyota Alphard",
    capacity: "1 - 6 Travelers",
    imageUrl: "https://images.unsplash.com/photo-1558101847-e017d5e414a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBhbHBoYXJkfGVufDB8fHx8MTc2NjQwMDcwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "toyota alphard"
  },
  {
    id: "transport-hiace",
    name: "Toyota Hiace",
    capacity: "7 - 14 Travelers",
    imageUrl: "https://images.unsplash.com/photo-1521014710171-f44dfe788ece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0b3lvdGElMjBoaWFjZXxlbnwwfHx8fDE3NjY0MDA3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "toyota hiace"
  },
  {
    id: "transport-coaster",
    name: "Coaster Bus",
    capacity: "15 - 28 Travelers",
    imageUrl: "https://images.unsplash.com/photo-1622390573893-d61510131108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjb2FzdGVyJTIwYnVzfGVufDB8fHx8MTc2NjQwMDcwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "coaster bus"
  },
]

const TransfersPage = () => {
  const firestore = useFirestore();
  const transfersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'transfers'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: transfers } = useCollection<Service>(transfersQuery);


  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
           <div className="p-2 bg-primary text-primary-foreground rounded-full mb-4">
              <Image src="/image/logo.jpg" alt="Babdodo Tours Logo" width={40} height={40} className="rounded-full" />
            </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Airport & Hotel Transfers</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-secondary-foreground">
            Start and end your journey with seamless, safe, and comfortable transportation.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transfers?.map(transfer => (
              <ServiceCard key={transfer.id} service={transfer} />
            ))}
          </div>
          {transfers?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No transfers available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

       <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Transport Types</h2>
            <p className="mt-4 text-muted-foreground">
              We use the best cars to satisfy our clients. Our cars fit for any type of travelers, Sole travelers, Couples, Families, and Groups.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {transportTypes.map((vehicle) => {
              return (
                <div key={vehicle.id} className="text-center">
                  <Image 
                    src={vehicle.imageUrl} 
                    alt={vehicle.name} 
                    width={400} 
                    height={300} 
                    className="rounded-lg object-contain aspect-[4/3]"
                    data-ai-hint={vehicle.imageHint}
                  />
                  <h3 className="mt-4 text-xl font-headline font-semibold">{vehicle.name}</h3>
                  <p className="text-muted-foreground">{vehicle.capacity}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
           <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Most Popular Booked Taxi Routes</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route) => (
              <Card key={route.to} className="bg-primary text-primary-foreground flex flex-col justify-between p-4">
                <CardContent className="p-2 text-center">
                  <p className="font-semibold">Taxi From Zanzibar Airport To {route.to}</p>
                </CardContent>
                <Button asChild variant="secondary" className="w-full mt-4">
                  <Link href="/contact">Book Now</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Book A Taxi With Us In Zanzibar?</h2>
            <p className="mt-4 text-muted-foreground">
              We provide a reliable, friendly, and hassle-free transfer experience from start to finish.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary text-primary-foreground rounded-full">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-headline font-semibold">No Additional Fees</h3>
              <p className="mt-2 text-muted-foreground">
                We do not charge any additional fees. The price you see is the price you pay.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary text-primary-foreground rounded-full">
                <Smile className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-headline font-semibold">Friendly Drivers</h3>
              <p className="mt-2 text-muted-foreground">
                Our drivers are professional, informative, and dedicated to your satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary text-primary-foreground rounded-full">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-headline font-semibold">Free Waiting & Cancellation</h3>
              <p className="mt-2 text-muted-foreground">
                We offer free waiting time for flight delays and free cancellation for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfersPage;
