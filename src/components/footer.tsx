import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Logo from '@/components/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developerPhoneNumber = process.env.NEXT_PUBLIC_DEVELOPER_WHATSAPP || "255";
  const developerEmail = process.env.NEXT_PUBLIC_DEVELOPER_EMAIL || "kimumilangali@gmail.com";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "babdodotoursandsafari@gmail.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER || "+255 678 575 092";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "#";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "#";
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";


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
              <Link href={facebookUrl} className="hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></Link>
              <Link href={instagramUrl} className="hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></Link>
              <Link href={twitterUrl} className="hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></Link>
              <Link href={youtubeUrl} className="hover:text-primary transition-colors"><Youtube className="w-6 h-6" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
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
              <li>Email: {contactEmail}</li>
              <li>Phone: {contactPhone}</li>
              <li>Zanzibar, Tanzania</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p className="mb-2">&copy; {currentYear} Babdodo Tours & Safaris. All rights reserved.</p>
          <div className="flex justify-center items-center gap-4 text-muted-foreground">
             <a href={`mailto:${developerEmail}`} className="hover:text-primary transition-colors">
              Developed by Milangali Kimu
            </a>
            <span className="mx-1">|</span>
             <a href={`https://wa.me/${developerPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Contact Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
