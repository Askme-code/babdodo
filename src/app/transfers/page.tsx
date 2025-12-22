import type { Metadata } from 'next';
import { getServicesByType } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import { TransferVanIcon } from '@/components/icons';
import { DollarSign, Smile, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Airport Transfers',
  description: 'Reliable and comfortable airport transfers in Zanzibar and mainland Tanzania.',
};

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

const TransfersPage = () => {
  const transfers = getServicesByType('transfer');

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
           <div className="p-4 bg-primary text-primary-foreground rounded-full mb-4">
              <TransferVanIcon className="w-10 h-10" />
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
            {transfers.map(transfer => (
              <ServiceCard key={transfer.id} service={transfer} />
            ))}
          </div>
          {transfers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No transfers available at the moment. Please check back later.</p>
            </div>
          )}
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
