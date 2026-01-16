import Link from 'next/link';
import { Clock, Users, Star, Check, X, DollarSign } from 'lucide-react';
import type { Service } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MediaRenderer from './MediaRenderer';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.image || "https://picsum.photos/seed/default/600/400";
  const serviceUrl = `/${service.type}s/${service.slug}`;

  return (
    <Dialog>
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
          
          <CardDescription className="mt-3 text-sm text-foreground/80 line-clamp-2 flex-grow">
            {service.description}
          </CardDescription>

          <div className="flex-grow" />

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              {service.duration && (
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    <span>{service.duration}</span>
                </div>
              )}
              {service.maxPeople && (
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5" />
                    <span>Max {service.maxPeople}</span>
                </div>
              )}
               {service.rating && (
                <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" />
                    <span>{service.rating}</span>
                </div>
              )}
          </div>
          
          <DialogTrigger asChild>
            <Button className="w-full mt-6">VIEW DETAILS &rarr;</Button>
          </DialogTrigger>
        </CardContent>
      </Card>
      
      <DialogContent className="sm:max-w-3xl p-0 overflow-y-auto max-h-[90vh]">
        <div className="aspect-video w-full relative rounded-t-lg overflow-hidden">
          <MediaRenderer
            src={imageUrl}
            alt={service.title}
            fill
            className="w-full h-full object-cover"
            data-ai-hint="tour landscape"
          />
        </div>
        <div className="p-6 space-y-6">
          <DialogHeader className="p-0 text-left">
            <DialogTitle className="text-3xl font-headline font-bold text-primary">{service.title}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b pb-4">
            {(service.pricePerPerson != null) && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <span className="text-2xl font-bold text-primary">${service.pricePerPerson}</span>
                  <span className="ml-1 text-muted-foreground">/ person</span>
                </div>
              </div>
            )}
            {(service.priceGroup != null) && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                 <div>
                  <span className="text-2xl font-bold text-primary">${service.priceGroup}</span>
                  <span className="ml-1 text-muted-foreground">/ group</span>
                </div>
              </div>
            )}
          </div>
          
          {service.highlights && service.highlights.length > 0 && (
            <div>
              <h3 className="font-headline text-xl font-semibold mb-3">Tour Highlights</h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
                {service.highlights.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-headline text-xl font-semibold mb-3">Tour Description</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: service.longDescription || service.description || '' }}>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {service.included && service.included.length > 0 && (
              <div>
                <h3 className="font-headline text-xl font-semibold mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {service.excluded && service.excluded.length > 0 && (
              <div>
                <h3 className="font-headline text-xl font-semibold mb-3">What's Excluded</h3>
                <ul className="space-y-2">
                  {service.excluded.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 bg-muted/50 sm:justify-between sticky bottom-0">
            <DialogClose asChild>
                <Button type="button" variant="outline">
                    Close
                </Button>
            </DialogClose>
            <Button asChild>
                <Link href="/contact">Book This Tour</Link>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCard;
