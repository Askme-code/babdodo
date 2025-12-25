import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react';

import type { Post } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const imageUrl = post.featuredImage || "https://picsum.photos/seed/default-post/400/300";
  
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-2 hover:shadow-xl group">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
          <div className="overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="travel blog"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <CardDescription className="mt-3 text-sm text-foreground/80 line-clamp-3 flex-grow">
          {post.excerpt}
        </CardDescription>
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
