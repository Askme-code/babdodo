import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';
import { FirebaseClientProvider } from '@/firebase';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Babdodo Tours & Safaris - Unforgettable Adventures in Tanzania & Zanzibar',
    template: '%s | Babdodo Tours & Safaris',
  },
  description: 'Explore the wonders of Zanzibar and Tanzania with Babdodo Tours & Safaris. We offer unforgettable, authentic, and tailor-made tours, safaris, and transfers.',
  keywords: ['Tanzania Safari', 'Zanzibar Tours', 'Airport Transfer', 'Babdodo Tours & Safaris', 'Serengeti Safari', 'Ngorongoro Crater', 'Stone Town Tour', 'Tanzania travel', 'Zanzibar holidays'],
  openGraph: {
    title: 'Babdodo Tours & Safaris',
    description: 'Explore the wonders of Zanzibar and Tanzania. We offer unforgettable tours, safaris, and transfers.',
    type: 'website',
    url: 'https://www.babdodotours.com', // Replace with your actual domain
    siteName: 'Babdodo Tours & Safaris',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1689479665129-bf064a64feaa?w=1200&h=630&fit=crop', // A representative hero image
        width: 1200,
        height: 630,
        alt: 'Elephants on a safari in Tanzania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babdodo Tours & Safaris',
    description: 'Unforgettable adventures in Tanzania & Zanzibar.',
    // creator: '@YourTwitterHandle', // Replace with your Twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Babdodo Tours & Safaris",
            "description": "Explore the wonders of Zanzibar and Tanzania with Babdodo Tours & Safaris. We offer unforgettable tours, safaris, and transfers.",
            "telephone": "+255678575092",
            "email": "babdodotourssafaris@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zanzibar",
              "addressCountry": "TZ"
            },
            "url": "https://www.babdodotours.com", // Replace with your actual domain
             "image": "https://images.unsplash.com/photo-1689479665129-bf064a64feaa?w=1200&h=630&fit=crop"
          }} />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <FirebaseClientProvider>
          <div className="gtranslate_wrapper"></div>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
          <Toaster />
        </FirebaseClientProvider>
        <Script id="gtranslate-settings">
          {`window.gtranslateSettings = {"default_language":"en","languages":["en","fr","it","es","ar"],"wrapper_selector":".gtranslate_wrapper"}`}
        </Script>
        <Script src="https://cdn.gtranslate.net/widgets/latest/float.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
