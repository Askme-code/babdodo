
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MediaRenderer from './MediaRenderer';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.image || "https://picsum.photos/seed/default/600/400";
  const serviceUrl = `/${service.type}s/${service.slug}`;
  // Placeholder rating as we don't have this in the data model yet
  const rating = (4.5 + Math.random() * 0.4).toFixed(1);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl group bg-card">
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
            <Badge className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-primary-foreground border-none">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </Badge>
          </CardHeader>
        </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={serviceUrl} className="block">
            <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {service.title}
            </CardTitle>
        </Link>
        <CardDescription className="mt-2 text-sm text-foreground/80 line-clamp-3 flex-grow">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
