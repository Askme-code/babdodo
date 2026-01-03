
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/safaris', label: 'Safaris' },
  { href: '/transfers', label: 'Transfers' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const TopBar = () => {
    const contactPhone1 = "+255 627 969840";
    const contactPhone2 = "+255 623 968736";
    const contactEmail = "info@twofriendstoursafari.com";
    const location = "Stone Town, Zanzibar";

    return (
        <div className="bg-primary text-primary-foreground text-xs py-2">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <a href={`tel:${contactPhone1}`} className="flex items-center gap-1 hover:text-yellow-300">
                        <Phone className="w-3 h-3" />
                        <span>{contactPhone1}</span>
                    </a>
                    <span className="hidden sm:inline">/</span>
                     <a href={`tel:${contactPhone2}`} className="hidden sm:flex items-center gap-1 hover:text-yellow-300">
                        <span>{contactPhone2}</span>
                    </a>
                    <a href={`mailto:${contactEmail}`} className="flex items-center gap-1 hover:text-yellow-300">
                        <Mail className="w-3 h-3" />
                        <span className="hidden sm:inline">{contactEmail}</span>
                    </a>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                </div>
            </div>
        </div>
    )
}

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <TopBar />
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary font-bold' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
               <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Menu</SheetTitle>
                  <SheetDescription>
                    Navigation links for Babdodo Tours & Safaris
                  </SheetDescription>
                </SheetHeader>
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <Logo />
                   <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary' : 'text-foreground/80'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <Button asChild size="lg" className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-primary-foreground">
                    <Link href="/contact">Book Now</Link>
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Button asChild className="hidden md:flex ml-6 bg-yellow-500 hover:bg-yellow-600 text-primary-foreground font-bold rounded-full px-6">
          <Link href="/contact">Book Now</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;

    