import Link from 'next/link';
import { Clock } from 'lucide-react';

import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MediaRenderer from './MediaRenderer';
import { Button } from './ui/button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.image || "https://picsum.photos/seed/default/600/400";
  const serviceUrl = `/${service.type}s/${service.slug}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl group bg-card border rounded-lg">
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
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={serviceUrl} className="block">
            <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {service.title}
            </CardTitle>
        </Link>
        
        <CardDescription className="mt-3 text-sm text-foreground/80 line-clamp-4">
          {service.description}
        </CardDescription>

        <div className="flex-grow" />

        {service.duration && (
          <div className="flex items-center text-sm text-muted-foreground mt-4">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>{service.duration}</span>
          </div>
        )}

        {service.included && service.included.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
                {service.included.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="secondary" className="bg-accent/80 text-accent-foreground hover:bg-accent">
                        {item}
                    </Badge>
                ))}
            </div>
        )}

        <Button asChild className="w-full mt-6">
            <Link href={serviceUrl}>VIEW DETAILS &rarr;</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
