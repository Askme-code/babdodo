
'use client';

import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  to: number;
  duration?: number;
}

const Counter = ({ to, duration = 1500 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = to;
          const frameDuration = 1000 / 60; // 60fps
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            start = Math.round(end * progress);

            if (frame === totalFrames) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(start);
            }
          }, frameDuration);

          // Disconnect observer after animation starts
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default Counter;
