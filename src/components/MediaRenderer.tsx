
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


const MediaRenderer = ({ src, alt, ...props }: MediaRendererProps) => {
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
    // Note: Instagram embeds have limitations and might not always display correctly.
    // They work best with a fixed aspect ratio or size.
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
