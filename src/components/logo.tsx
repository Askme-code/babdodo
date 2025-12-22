import Link from 'next/link';
import { MountainSnow } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary text-primary-foreground rounded-lg group-hover:bg-primary/90 transition-colors">
        <MountainSnow className="w-6 h-6" />
      </div>
      <span className="text-xl font-semibold font-headline text-primary-dark group-hover:text-primary-dark/90 transition-colors">
        Babdodo Explorer
      </span>
    </Link>
  );
};

export default Logo;
