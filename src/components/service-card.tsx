import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const placeholder = PlaceHolderImages.find(p => p.id === service.image);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/default/600/400";
  const imageHint = placeholder?.imageHint || "tour landscape";
  const serviceUrl = `/${service.type}s/${service.slug}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={serviceUrl} className="block">
          <Image
            src={imageUrl}
            alt={service.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={imageHint}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 capitalize">{service.type}</Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={serviceUrl} className="block">
            <CardTitle className="font-headline text-xl leading-tight hover:text-primary transition-colors">
            {service.title}
            </CardTitle>
        </Link>
        <div className="flex items-center text-muted-foreground text-sm mt-2">
          <MapPin className="w-4 h-4 mr-1.5" />
          <span>{service.location}</span>
        </div>
        <p className="mt-3 text-sm text-foreground/80 line-clamp-3">
          {service.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="text-lg font-bold text-primary">
          ${service.price}
          <span className="text-sm font-normal text-muted-foreground">/person</span>
        </div>
        <Button asChild>
          <Link href={serviceUrl}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
