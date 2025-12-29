
'use client';

import Image from 'next/image';
import React from 'react';

interface MediaRendererProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  'data-ai-hint'?: string;
  fill?: boolean;
}


class MediaErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("MediaRenderer Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-48 flex items-center justify-center bg-muted rounded-lg">
          <p className="text-muted-foreground text-sm">Error loading media</p>
        </div>
      );
    }
    return this.props.children;
  }
}


const MediaRenderer = ({ src, alt, ...props }: MediaRendererProps) => {
  if (!src) {
     return (
        <div className="w-full h-48 flex items-center justify-center bg-muted rounded-lg">
          <p className="text-muted-foreground text-sm">No media source</p>
        </div>
      );
  }

  // Simplified: This component will now only handle standard image rendering via next/image.
  // The logic for YouTube/Instagram has been removed to fix the local image path issue.
  return (
    <MediaErrorBoundary>
      <Image
        src={src}
        alt={alt}
        fill={props.fill}
        width={props.fill ? undefined : props.width || 600}
        height={props.fill ? undefined : props.height || 400}
        sizes={props.fill ? "100vw" : undefined}
        className={props.className}
        priority={props.priority}
        data-ai-hint={props['data-ai-hint']}
      />
    </MediaErrorBoundary>
  );
};

export default MediaRenderer;
