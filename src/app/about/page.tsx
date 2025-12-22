import Image from 'next/image';
import type { Metadata } from 'next';
import { Globe, Heart, ShieldCheck } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DhowBoatIcon, SafariJeepIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the team and passion behind Babdodo Explorer.',
};

const AboutPage = () => {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About Babdodo Explorer</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-secondary-foreground">
            Your trusted partner for authentic adventures in Tanzania and Zanzibar.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-headline text-primary">Our Story</h2>
            <p className="mt-4 text-foreground/80">
              Founded by a team of native Tanzanians with a shared passion for nature and hospitality, Babdodo Explorer was born from a desire to share the authentic beauty of our homeland with the world. We grew up surrounded by the stunning landscapes of the Serengeti and the rich culture of Zanzibar, and our mission is to create journeys that are as enriching and memorable for you as they are for us.
            </p>
            <p className="mt-4 text-foreground/80">
              We believe in responsible tourism that supports local communities and preserves our pristine environments for generations to come. When you travel with us, you're not just a tourist; you're part of our extended family, contributing to a sustainable future for Tanzania.
            </p>
          </div>
          <div>
            <Image
              src={aboutImage?.imageUrl || ''}
              alt={aboutImage?.description || 'Babdodo team'}
              width={600}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto object-cover"
              data-ai-hint={aboutImage?.imageHint}
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground">
              These principles guide everything we do, from planning your trip to guiding you through the wild.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary text-primary-foreground rounded-full">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-headline font-semibold">Authenticity</h3>
              <p className="mt-2 text-muted-foreground">
                We provide genuine experiences that connect you with the local culture and nature.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary text-primary-foreground rounded-full">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-headline font-semibold">Sustainability</h3>
              <p className="mt-2 text-muted-foreground">
                We are committed to eco-friendly practices that protect our environment and support communities.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary text-primary-foreground rounded-full">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-headline font-semibold">Excellence</h3>
              <p className="mt-2 text-muted-foreground">
                From safety to comfort, we ensure the highest quality in every aspect of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
