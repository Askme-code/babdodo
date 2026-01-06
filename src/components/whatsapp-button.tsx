
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6 text-white"
  >
    <path d="M19.6,14.8c-0.4-0.2-1.3-0.6-1.5-0.7c-0.2-0.1-0.3-0.1-0.5,0.1c-0.1,0.2-0.5,0.7-0.7,0.8c-0.1,0.1-0.3,0.2-0.5,0.1 c-0.2-0.1-0.9-0.3-1.8-1.1c-0.7-0.6-1.1-1.4-1.3-1.6c-0.1-0.2,0-0.3,0.1-0.4c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.2-0.3 c0-0.1,0-0.3-0.1-0.4c-0.1-0.1-0.5-1.3-0.7-1.7c-0.2-0.4-0.4-0.4-0.5-0.4c-0.1,0-0.3,0-0.5,0c-0.2,0-0.4,0.1-0.6,0.3 c-0.2,0.2-0.8,0.8-0.8,1.9c0,1.1,0.8,2.2,0.9,2.4c0.1,0.2,1.6,2.5,4,3.5c0.6,0.2,1,0.4,1.4,0.5c0.6,0.2,1.2,0.2,1.6,0.1 c0.5-0.1,1.3-0.5,1.5-1c0.2-0.4,0.2-0.8,0.1-0.9C20,15,19.9,14.9,19.6,14.8z M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10 c1.7,0,3.4-0.5,4.8-1.3l3.2,1.1l-1.2-3.1C19.6,17.1,20,15.6,20,14C22,8.5,17.5,2,12,2z" />
  </svg>
);


const WhatsAppButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "255678575092";
  const message = "Hello! I'm interested in your tours and safaris.";

  return (
    <Button
        asChild
        className="rounded-full h-14 w-auto px-4 shadow-lg bg-[#25D366] hover:bg-[#128C7E] flex items-center gap-2"
        >
        <Link
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
        >
            <WhatsAppIcon />
            <span className="font-semibold">Chat on WhatsApp</span>
        </Link>
    </Button>
  );
};

export default WhatsAppButton;
