
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

const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getInstagramId = (url: string): { type: 'p' | 'reel', id: string } | null => {
    if (!url) return null;
    const regExp = /https?:\/\/(?:www\.)?instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    if (match && match[1] && match[2]) {
        return {
            type: match[1] as 'p' | 'reel',
            id: match[2]
        };
    }
    return null;
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
  
  if (src.startsWith('http')) {
      const youtubeId = getYouTubeId(src);
      const instagramInfo = getInstagramId(src);

      if (youtubeId) {
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={alt}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        );
      }

      if (instagramInfo) {
        return (
            <div className="w-full overflow-hidden rounded-lg" style={{aspectRatio: '1/1'}}>
                <iframe
                    src={`https://www.instagram.com/${instagramInfo.type}/${instagramInfo.id}/embed`}
                    title={alt}
                    frameBorder="0"
                    allowFullScreen
                    scrolling="no"
                    className="w-full h-full"
                ></iframe>
            </div>
        );
      }
  }

  return (
    <MediaErrorBoundary>
      <Image
        src={src}
        alt={alt}
        width={props.fill ? undefined : (props.width || 600)}
        height={props.fill ? undefined : (props.height || 400)}
        {...props}
      />
    </MediaErrorBoundary>
  );
};

export default MediaRenderer;
