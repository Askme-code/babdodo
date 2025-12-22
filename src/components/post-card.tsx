import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react';

import type { Post } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const placeholder = PlaceHolderImages.find(p => p.id === post.featuredImage);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/default-post/400/300";
  const imageHint = placeholder?.imageHint || "travel blog";
  
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={imageUrl}
            alt={post.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint={imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="font-headline text-xl leading-tight hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <p className="mt-3 text-sm text-foreground/80 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <User className="w-3.5 h-3.5 mr-1.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>{post.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
