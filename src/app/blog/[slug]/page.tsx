
'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User, Calendar } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { JsonLd } from '@/components/JsonLd';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import type { Post } from '@/lib/types';


type PostPageProps = {
  params: {
    slug: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const firestore = useFirestore();

  const postQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'news_updates'), where('slug', '==', params.slug), limit(1));
  }, [firestore, params.slug]);
  
  const { data: posts, isLoading } = useCollection<Post>(postQuery);
  const post = posts?.[0];

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && !post) {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(p => p.id === post.featuredImage);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": mainImage?.imageUrl || '',
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": new Date(post.date).toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Babdodo Tours & Safaris",
       "logo": {
        "@type": "ImageObject",
        "url": "https://www.babdodotours.com/logo.png" // Replace with your actual logo URL
      }
    }
  };

  return (
    <>
    <JsonLd data={jsonLdData} />
    <div className="bg-background">
      <div className="container max-w-4xl mx-auto py-8 md:py-16 px-4">
        <article>
          <header className="mb-8 text-center">
             <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">
                {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://picsum.photos/seed/${post.author}/100/100`} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
          </header>

          <Image
            src={mainImage?.imageUrl || ''}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded-lg object-cover aspect-video w-full mb-8"
            priority
            data-ai-hint={mainImage?.imageHint}
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90" dangerouslySetInnerHTML={{ __html: post.content || ''}}>
          </div>
        </article>

        <div className="mt-16">
          <ContentRecommender currentContent={post.title} contentType="post" />
        </div>
      </div>
    </div>
    </>
  );
}
