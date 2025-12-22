"use client";

import { recommendContent } from "@/ai/flows/content-recommendations";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Wand2 } from 'lucide-react';
import { Skeleton } from "./ui/skeleton";

interface ContentRecommenderProps {
  currentContent: string;
  contentType: "tour" | "safari" | "transfer" | "post";
}

const ContentRecommender = ({ currentContent, contentType }: ContentRecommenderProps) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecommendations() {
      setLoading(true);
      try {
        const result = await recommendContent({ currentContent, contentType });
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error("Failed to get recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    getRecommendations();
  }, [currentContent, contentType]);

  if (loading) {
    return (
        <div>
            <h3 className="font-headline text-2xl text-primary mb-4 flex items-center">
                <Wand2 className="mr-2" /> You Might Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full hidden sm:block" />
            </div>
      </div>
    );
  }
  
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-card p-6 rounded-lg">
      <h3 className="font-headline text-2xl text-primary mb-4 flex items-center">
        <Wand2 className="mr-2" /> You Might Also Like
      </h3>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index}>
            <Link href="#" className="text-foreground/80 hover:text-primary hover:underline">
              {rec}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentRecommender;
