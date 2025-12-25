import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.image || "https://picsum.photos/seed/default/600/400";
  const serviceUrl = `/${service.type}s/${service.slug}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-2 hover:shadow-xl group">
      <CardHeader className="p-0 relative">
        <Link href={serviceUrl} className="block" aria-label={`View details for ${service.title}`}>
          <div className="overflow-hidden">
             <Image
              src={imageUrl}
              alt={service.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="tour landscape"
            />
          </div>
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 capitalize">{service.type}</Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={serviceUrl} className="block">
            <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {service.title}
            </CardTitle>
        </Link>
        <div className="flex items-center text-muted-foreground text-sm mt-2">
          <MapPin className="w-4 h-4 mr-1.5" />
          <span>{service.location}</span>
        </div>
        <CardDescription className="mt-3 text-sm text-foreground/80 line-clamp-3">
          {service.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-lg font-bold text-primary mb-2 sm:mb-0">
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
