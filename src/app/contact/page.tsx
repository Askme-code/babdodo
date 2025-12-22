import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Babdodo Tours & Safaris to plan your next adventure.',
};

const ContactPage = () => {
  return (
    <div className="bg-background">
       <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-secondary-foreground">
            We're here to help you plan the adventure of a lifetime. Questions? Inquiries? Let us know!
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-16">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-headline font-bold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-headline font-semibold">Contact Information</h3>
              <p className="text-muted-foreground mt-2">
                Our team is available to answer your questions and help you with your booking.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary text-primary-foreground rounded-full">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a href="mailto:babdodotourssafaris@gmail.com" className="text-primary hover:underline">babdodotourssafaris@gmail.com</a>
                <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary text-primary-foreground rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Phone / WhatsApp</h4>
                <a href="tel:+255678575092" className="text-primary hover:underline">+255 678 575 092</a>
                <p className="text-sm text-muted-foreground">Mon - Sat, 9am - 6pm (EAT)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary text-primary-foreground rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Our Office</h4>
                <p>Stone Town, Zanzibar<br/>Tanzania</p>
                <p className="text-sm text-muted-foreground">Meetings by appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
