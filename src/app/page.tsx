
'use client';
import Image from 'next/image';
import Link from 'next/link';

import ServiceCard from '@/components/service-card';
import PostCard from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { DhowBoatIcon, SafariJeepIcon } from '@/components/icons';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit, orderBy } from 'firebase/firestore';
import type { Service, Post, Review } from '@/lib/types';
import MediaRenderer from '@/components/MediaRenderer';
import ReviewForm from '@/components/review-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Handshake, MapPin, PlaneTakeoff } from 'lucide-react';


const Hero = () => {
  const heroImages = [
    { src: '/image/airport.jpg', caption: 'Seamless Airport Transfers' },
    { src: '/image/sunset cru.jpg', caption: 'Unforgettable Sunset Cruises' },
    { src: '/image/sunset background.jpg', caption: 'Breathtaking Safari Sunsets' },
    { src: '/image/local boats.jpg', caption: 'Authentic Local Experiences' },
    { src: '/image/kilimanjaro.jpg', caption: 'Majestic Mount Kilimanjaro' },
  ];

  return (
     <section className="relative h-[70vh] md:h-[85vh] w-full">
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent>
          {heroImages.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[70vh] md:h-[85vh]">
                <MediaRenderer
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint="safari sunset"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
                 <div className="container relative h-full flex flex-col items-center justify-center text-center text-white p-4">
                   <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg animate-in fade-in slide-in-from-bottom-12 duration-1000">
                     {img.caption}
                   </h1>
                 </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
            <div className="container flex flex-col items-center justify-center text-center text-white">
                 <p className="text-lg md:text-xl max-w-3xl drop-shadow-md mb-8">
                    Discover the untamed beauty of Tanzania and the serene beaches of Zanzibar with Babdodo Tours & Safaris.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                        <Link href="/safaris">Explore Safaris</Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/tours">Discover Tours</Link>
                    </Button>
                </div>
            </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { icon: Handshake, label: "Happy Clients", value: "1,000+" },
    { icon: MapPin, label: "Destinations", value: "100+" },
    { icon: PlaneTakeoff, label: "Tours & Excursions", value: "10,000+" },
  ]
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
             <div key={stat.label} className="flex flex-col items-center">
               <div className="p-4 border-2 border-primary rounded-full mb-4 bg-primary/10">
                 <stat.icon className="w-10 h-10 text-primary" />
               </div>
               <p className="text-4xl font-bold">{stat.value}</p>
               <h3 className="text-sm uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</h3>
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const firestore = useFirestore();

  const featuredToursQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'tours'), orderBy('createdAt', 'desc'), limit(3));
  }, [firestore]);
  const { data: featuredTours } = useCollection<Service>(featuredToursQuery);

  const featuredSafarisQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'safaris'), orderBy('createdAt', 'desc'), limit(3));
  }, [firestore]);
  const { data: featuredSafaris } = useCollection<Service>(featuredSafarisQuery);

  const featuredTransfersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'transfers'), orderBy('createdAt', 'desc'), limit(3));
    }, [firestore]);
  const { data: featuredTransfers } = useCollection<Service>(featuredTransfersQuery);

  const latestPostsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'news_updates'), orderBy('date', 'desc'), limit(3));
  }, [firestore]);
  const { data: latestPosts } = useCollection<Post>(latestPostsQuery);

  const aboutImage = "/image/masai.jpg";
  const galleryImages = [
    { src: '/image/ngorongoro.jpg', alt: 'Wildlife in Ngorongoro Crater' },
    { src: '/image/beach 1.jpg', alt: 'Pristine beach in Zanzibar' },
    { src: '/image/masai.jpg', alt: 'Maasai people in traditional attire' },
    { src: '/image/sunset cru.jpg', alt: 'Sunset dhow cruise' },
    { src: '/image/kilimanjaro.jpg', alt: 'Mount Kilimanjaro' },
    { src: '/image/star fish.jpg', alt: 'Starfish on a sandbank' },
  ];


  return (
    <div>
      <Hero />
      <Stats />
      
      <section className="py-12 md:py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">Featured Safaris</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Embark on a journey through Tanzania's most iconic national parks. Witness breathtaking landscapes and majestic wildlife.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredSafaris?.map(safari => (
              <ServiceCard key={safari.id} service={safari} />
            ))}
             {(!featuredSafaris || featuredSafaris.length === 0) && <p className="text-center text-muted-foreground col-span-full">No safaris to display yet.</p>}
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
            {featuredTours?.map(tour => (
              <ServiceCard key={tour.id} service={tour} />
            ))}
             {(!featuredTours || featuredTours.length === 0) && <p className="text-center text-muted-foreground col-span-full">No tours to display yet.</p>}
          </div>
           <div className="text-center mt-12">
            <Button asChild>
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">Convenient Transfers</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Travel with ease and comfort. We offer reliable transfers to and from airports, hotels, and more.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredTransfers?.map(transfer => (
              <ServiceCard key={transfer.id} service={transfer} />
            ))}
             {(!featuredTransfers || featuredTransfers.length === 0) && <p className="text-center text-muted-foreground col-span-full">No transfers to display yet.</p>}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/transfers">View All Transfers</Link>
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
                src={aboutImage}
                alt={'Maasai people in traditional clothing'}
                width={600}
                height={500}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                data-ai-hint={'maasai people'}
                />
            </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">From Our Gallery</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the unforgettable moments captured during our adventures.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg group">
                    <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Leave a Review</h2>
              <p className="mt-4 text-muted-foreground">
                Had a great experience with us? We'd love to hear about it! Your feedback helps us and other travelers.
              </p>
               <div className="mt-6 bg-card p-8 rounded-lg shadow-lg">
                 <ReviewForm />
               </div>
            </div>
            <div className="mt-12 md:mt-0">
                 <h2 className="text-3xl md:text-4xl font-headline font-bold">Latest From Our Blog</h2>
                  <p className="mt-4 text-muted-foreground">
                    Get the latest travel tips, stories from the wild, and updates from our team.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-6">
                     {latestPosts?.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                     {(!latestPosts || latestPosts.length === 0) && <p className="text-center text-muted-foreground">No blog posts to display yet.</p>}
                  </div>
                   <div className="text-left mt-8">
                    <Button asChild>
                      <Link href="/blog">Read Our Blog</Link>
                    </Button>
                  </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
