
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Logo from '@/components/logo';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="w-6 h-6">
        <path fill="#4285F4" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#34A853" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l5.657,5.657C41.312,35.51,44,30.34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FBBC05" d="M12.961,11.039l-5.657,5.657C6.053,19.954,4,24,4,24c0,0.46,0.018,0.913,0.05,1.36l5.71-4.4C9.176,17.753,9.58,14.62,11.36,12.24c0.5-0.66,1.06-1.28,1.6-1.2z"/>
        <path fill="#EA4335" d="M24,44c5.166,0,9.86-1.977,13.2-5.2l-5.657-5.657c-1.856,1.406-4.087,2.237-6.543,2.237c-3.956,0-7.341-2.483-8.663-5.957l-5.71,4.4C7.994,38.384,15.467,44,24,44z"/>
        <path fill="none" d="M4,4h40v40H4z"/>
    </svg>
);

const TripAdvisorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 w-6 h-6">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 16c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm7 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm-3.5-7.104c-2.404 0-4.596 1.416-5.465 3.488-.235.544.133 1.116.701 1.116h1.229c.401 0 .752-.26.884-.648.567-1.655 2.115-2.823 3.901-2.823s3.334 1.168 3.901 2.823c.132.388.483.648.884.648h1.229c.568 0 .936-.572.701-1.116-1.04-2.271-3.232-3.488-5.465-3.488z"/>
    </svg>
);

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
  const googleReviewUrl = "https://www.google.com/search?q=Babdodo+Tours+%26+Safaris&stick=H4sIAAAAAAAAAONgU1I1qDC0ME1OMUy1ME4zNzJNSjS3AgoZJCWlphqYmaSaJ6VYJpsvYhV3SkxKyU_JVwjJLy0qVlBTCE5MSyzKLAYAhVh0Y0MAAAA#lrd=0x185d153359d95f87:0xd5713437df4c75f4,1";
  const tripAdvisorReviewUrl = "https://www.tripadvisor.com/Attraction_Review-g482884-d23976332-Reviews-Babdodo_Tours_Safaris-Zanzibar_Island_Zanzibar_Archipelago.html";


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
              <Link href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><GoogleIcon /></Link>
              <Link href={tripAdvisorReviewUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><TripAdvisorIcon /></Link>
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
