
'use client';

import Image from 'next/image';

interface MediaRendererProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  'data-ai-hint'?: string;
}

const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const MediaRenderer = ({ src, alt, ...props }: MediaRendererProps) => {
  const youtubeId = getYouTubeId(src);

  if (youtubeId) {
    return (
      <div className="aspect-video w-full overflow-hidden">
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

  // Fallback to next/image for regular image URLs
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      {...props}
    />
  );
};

export default MediaRenderer;
