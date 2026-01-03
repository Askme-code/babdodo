
import Link from 'next/link';
import { MapPin } from 'lucide-react';

import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import MediaRenderer from './MediaRenderer';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.image || "https://picsum.photos/seed/default/600/400";
  const serviceUrl = `/${service.type}s/${service.slug}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg group bg-card border rounded-lg">
       <Link href={serviceUrl} className="block" aria-label={`View details for ${service.title}`}>
          <CardHeader className="p-0 relative">
            <div className="overflow-hidden aspect-video rounded-t-lg">
              <MediaRenderer
                src={imageUrl}
                alt={service.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="tour landscape"
              />
            </div>
             <div className="absolute top-0 right-0 m-2">
                <Badge variant="secondary" className="capitalize bg-background/80 backdrop-blur-sm text-foreground/80">
                    {service.type}
                </Badge>
            </div>
          </CardHeader>
        </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={serviceUrl} className="block">
            <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {service.title}
            </CardTitle>
        </Link>
        {service.location && (
            <div className="flex items-center text-sm text-muted-foreground mt-2">
                <MapPin className="w-4 h-4 mr-1.5" />
                <span>{service.location}</span>
            </div>
        )}
        <CardDescription className="mt-2 text-sm text-foreground/80 line-clamp-2 flex-grow">
          {service.description}
        </CardDescription>
        
      </CardContent>
       <Separator />
       <CardFooter className="p-4 flex items-center justify-between">
          <div className="flex items-baseline">
            <p className="text-xl font-bold text-primary">${service.price}</p>
            <span className="text-xs text-muted-foreground ml-1">/person</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href={serviceUrl}>View Details</Link>
            </Button>
             <Button asChild size="sm">
                <Link href="/contact">Book Now</Link>
            </Button>
           </div>
        </CardFooter>
    </Card>
  );
};

export default ServiceCard;
