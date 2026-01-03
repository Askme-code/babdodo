
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import MediaRenderer from './MediaRenderer';
import { Button } from './ui/button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.image || "https://picsum.photos/seed/default/600/400";
  const serviceUrl = `/${service.type}s/${service.slug}`;
  const rating = (4.5 + Math.random() * 0.4).toFixed(1);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-2xl group bg-card border rounded-lg">
       <Link href={serviceUrl} className="block" aria-label={`View details for ${service.title}`}>
          <CardHeader className="p-0 relative">
            <div className="overflow-hidden aspect-[4/3]">
              <MediaRenderer
                src={imageUrl}
                alt={service.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="tour landscape"
              />
            </div>
             <div className="absolute top-0 right-0 m-2">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {service.duration}
                </Badge>
            </div>
          </CardHeader>
        </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Badge variant="outline" className="mb-2 w-fit capitalize">{service.type}</Badge>
        <Link href={serviceUrl} className="block">
            <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {service.title}
            </CardTitle>
        </Link>
        <CardDescription className="mt-2 text-sm text-foreground/80 line-clamp-2 flex-grow">
          {service.description}
        </CardDescription>
        
      </CardContent>
       <CardFooter className="p-4 bg-muted/50 border-t flex-col items-start gap-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="text-2xl font-bold text-primary">${service.price}</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span>{rating}</span>
            </div>
          </div>
           <div className="w-full">
             <Button asChild className="w-full">
                <Link href={serviceUrl}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
           </div>
        </CardFooter>
    </Card>
  );
};

export default ServiceCard;
