
import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Babdodo Tours & Safaris to plan your next adventure.',
};

const ContactPage = () => {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "babdodotourssafaris@gmail.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER || "+255 678 575 092";
  const contactPhoneUrl = `tel:${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "255678575092")}`;

  return (
    <div className="bg-background">
       <section className="relative h-[40vh] w-full bg-secondary">
        <Image
            src="/image/local boats.jpg"
            alt="Local boats on a Zanzibar beach"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
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
                <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
                <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary text-primary-foreground rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Phone / WhatsApp</h4>
                <a href={contactPhoneUrl} className="text-primary hover:underline">{contactPhone}</a>
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
             <div className="mt-4 overflow-hidden rounded-lg shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7933.525226773835!2d39.18785396386008!3d-6.162538558324625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd059242fbd01%3A0x9a18e54b0e5a94d8!2sStone%20Town%2C%20Zanzibar!5e0!3m2!1sen!2stz!4v1766400798440!5m2!1sen!2stz"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
