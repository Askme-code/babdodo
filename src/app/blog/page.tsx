import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/data';
import PostCard from '@/components/post-card';
import { Rss } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, travel tips, and stories from Babdodo Tours & Safaris.',
};

const BlogPage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] w-full bg-secondary">
        <div className="container h-full flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-primary text-primary-foreground rounded-full mb-4">
              <Rss className="w-10 h-10" />
            </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">News & Updates</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-secondary-foreground">
            Your source for travel inspiration and expert advice for your next adventure.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
           {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No posts available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
