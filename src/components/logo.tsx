import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src="/image/logo.jpg"
        alt="Babdodo Tours & Safaris Logo"
        width={40}
        height={40}
        className="rounded-lg"
      />
      <span className="text-xl font-semibold font-headline text-primary-dark group-hover:text-primary-dark/90 transition-colors">
        Babdodo Tours & Safaris
      </span>
    </Link>
  );
};

export default Logo;
