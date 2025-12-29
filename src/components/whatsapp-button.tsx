import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const WhatsAppButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "255678575092";
  const message = "Hello! I'm interested in your tours and safaris.";

  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-[#25D366] hover:bg-[#128C7E] text-white"
    >
      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon />
      </Link>
    </Button>
  );
};

export default WhatsAppButton;
