import type { Metadata } from 'next';
import { getServicesByType } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import { TransferVanIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Airport Transfers',
  description: 'Reliable and comfortable airport transfers in Zanzibar and mainland Tanzania.',
};

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
    </div>
  );
};

export default TransfersPage;
