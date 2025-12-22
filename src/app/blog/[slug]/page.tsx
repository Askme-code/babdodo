import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { User, Calendar } from 'lucide-react';

import { getPostBySlug, getAllPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import ContentRecommender from '@/components/content-recommender';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { JsonLd } from '@/components/JsonLd';


type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const mainImage = PlaceHolderImages.find(p => p.id === post.featuredImage);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        authors: [post.author],
        images: [
            {
                url: mainImage?.imageUrl || '',
                width: 1200,
                height: 630,
                alt: post.title,
            }
        ]
    }
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
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
                    <span>{post.date}</span>
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
          
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
            <p className="lead text-xl">{post.excerpt}</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
            </p>
            <p>
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. 
            </p>
            <blockquote>
                "The only man I envy is the man who has not yet been to Africa - for he has so much to look forward to." - Richard Mullin
            </blockquote>
            <p>
                Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
            </p>
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
