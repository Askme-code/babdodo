
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore photos from our tours, safaris, and adventures in Tanzania and Zanzibar.',
};

const imageList = [
  { src: '/image/airport.jpg', alt: 'Zanzibar Airport' },
  { src: '/image/beach 1.jpg', alt: 'Pristine beach in Zanzibar' },
  { src: '/image/beach life.jpg', alt: 'Relaxing beach life' },
  { src: '/image/foods.jpg', alt: 'Delicious local Zanzibar food' },
  { src: '/image/forozani zanzibar.jpg', alt: 'Forodhani Gardens in Stone Town' },
  { src: '/image/hotels.jpg', alt: 'Beautiful hotel accommodation' },
  { src: '/image/kilimanjaro.jpg', alt: 'Mount Kilimanjaro' },
  { src: '/image/local boats.jpg', alt: 'Traditional dhow boats' },
  { src: '/image/masai.jpg', alt: 'Maasai people in traditional attire' },
  { src: '/image/monkey from jozan.jpg', alt: 'Red colobus monkey in Jozani Forest' },
  { src: '/image/mount kilimanjaro.jpg', alt: 'View of Mount Kilimanjaro' },
  { src: '/image/ngorongoro.jpg', alt: 'Wildlife in Ngorongoro Crater' },
  { src: '/image/snowkelling.jpg', alt: 'Snorkeling in the Indian Ocean' },
  { src: '/image/star fish.jpg', alt: 'Starfish on a sandbank' },
  { src: '/image/sunset background.jpg', alt: 'African sunset on a safari' },
  { src: '/image/sunset cru.jpg', alt: 'Sunset dhow cruise' },
  { src: '/image/zanzibar local ride.jpg', alt: 'Local transportation in Zanzibar' },
  { src: '/image/zanzibar local rides vespa.jpg', alt: 'Vespa ride in Zanzibar' },
];

const GalleryPage = () => {
  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <Image
            src="/image/ngorongoro.jpg"
            alt="Ngorongoro Crater"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Gallery</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            A collection of moments from our unforgettable adventures.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {imageList.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg break-inside-avoid">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
