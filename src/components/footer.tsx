import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Logo from '@/components/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">
              Explore the wonders of Zanzibar and Tanzania with our expert guides.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://www.facebook.com/share/1AXL9h5oHT/" className="hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></Link>
              <Link href="https://www.instagram.com/babdodotoursandsafaris" className="hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Youtube className="w-6 h-6" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Our Services</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/tours" className="hover:text-primary transition-colors">Zanzibar Tours</Link></li>
              <li><Link href="/safaris" className="hover:text-primary transition-colors">Tanzania Safaris</Link></li>
              <li><Link href="/transfers" className="hover:text-primary transition-colors">Airport Transfers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Email: babdodotourssafaris@gmail.com</li>
              <li>Phone: +255 678 575 092</li>
              <li>Zanzibar, Tanzania</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} Babdodo Tours & Safaris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
