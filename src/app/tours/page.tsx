import type { Metadata } from 'next';
import { getServicesByType } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import { DhowBoatIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Zanzibar Tours',
  description: 'Explore the best tours Zanzibar has to offer, from spice farms to historic Stone Town.',
};

const ToursPage = () => {
  const tours = getServicesByType('tour');

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
           <div className="p-4 bg-primary text-primary-foreground rounded-full mb-4">
              <DhowBoatIcon className="w-10 h-10" />
            </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Zanzibar Tours</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-secondary-foreground">
            Immerse yourself in the culture, history, and natural beauty of the Spice Island.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => (
              <ServiceCard key={tour.id} service={tour} />
            ))}
          </div>
           {tours.length === 0 && (
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
