import Image from 'next/image';
import Link from 'next/link';

import { getFeaturedPosts, getFeaturedServices } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ServiceCard from '@/components/service-card';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { DhowBoatIcon, SafariJeepIcon } from '@/components/icons';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-safari');
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full">
      <Image
        src={heroImage?.imageUrl || ''}
        alt={heroImage?.description || 'Safari landscape with elephants in Tanzania'}
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage?.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
      <div className="relative container h-full flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg">
          Your Adventure Awaits
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl drop-shadow-md">
          Discover the untamed beauty of Tanzania and the serene beaches of Zanzibar with Babdodo Tours & Safaris.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/safaris">Explore Safaris</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/tours">Discover Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const featuredTours = getFeaturedServices('tour');
  const featuredSafaris = getFeaturedServices('safari');
  const latestPosts = getFeaturedPosts(3);
  const aboutImage = PlaceHolderImages.find(p => p.id === 'dhow-sunset');

  return (
    <div>
      <Hero />
      
      <section className="py-12 md:py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">Featured Safaris</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Embark on a journey through Tanzania's most iconic national parks. Witness breathtaking landscapes and majestic wildlife.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredSafaris.map(safari => (
              <ServiceCard key={safari.id} service={safari} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/safaris">View All Safaris</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">Popular Zanzibar Tours</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Experience the magic of the Spice Island, from historic Stone Town to pristine coral reefs.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredTours.map(tour => (
              <ServiceCard key={tour.id} service={tour} />
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild>
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose Babdodo?</h2>
                <p className="mt-4 text-secondary-foreground/80">
                  We are a team of passionate local experts dedicated to crafting unforgettable experiences. With years of experience and a deep love for our homeland, we ensure your journey is authentic, comfortable, and truly magical.
                </p>
                <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full p-2">
                           <SafariJeepIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Expert Local Guides</h3>
                            <p className="text-secondary-foreground/80 text-sm">Our guides are your key to unlocking the secrets of Tanzania and Zanzibar.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full p-2">
                            <DhowBoatIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Tailor-Made Itineraries</h3>
                            <p className="text-secondary-foreground/80 text-sm">We customize every trip to match your dreams and your budget.</p>                        </div>
                    </div>
                </div>
                <Button asChild className="mt-8">
                    <Link href="/about">Learn More About Us</Link>
                </Button>
            </div>
            <div className="order-1 md:order-2">
                <Image
                src={aboutImage?.imageUrl || ''}
                alt={aboutImage?.description || 'A traditional dhow boat at sunset in Zanzibar'}
                width={600}
                height={500}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                data-ai-hint={aboutImage?.imageHint}
                />
            </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">News & Updates</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Get the latest travel tips, stories from the wild, and updates from our team.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {latestPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild>
              <Link href="/blog">Read Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
