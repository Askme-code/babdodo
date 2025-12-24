import type { Metadata } from 'next';
import { getServicesByType } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tanzania Safaris',
  description: 'Embark on a wild adventure through Tanzania\'s most famous national parks.',
};

const SafarisPage = async () => {
  const safaris = await getServicesByType('safari');

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
           <div className="p-2 bg-primary text-primary-foreground rounded-full mb-4">
              <Image src="/image/logo.jpg" alt="Babdodo Tours Logo" width={40} height={40} className="rounded-full" />
            </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Tanzania Safaris</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-secondary-foreground">
            Witness the Great Migration, see the Big Five, and create memories that will last a lifetime.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safaris.map(safari => (
              <ServiceCard key={safari.id} service={safari} />
            ))}
          </div>
          {safaris.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No safaris available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SafarisPage;
