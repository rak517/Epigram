import { EpigramEvents } from '@/utils/analytics';
import { useEffect, useRef } from 'react';

export const useScrollTracking = () => {
  const trackedPointsRef = useRef<number[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (typeof window !== 'undefined') {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight) - window.innerHeight;

          const scrollPercentage = Math.floor((scrollTop / documentHeight) * 100);
          const scrollPoints = [25, 50, 75, 100];

          scrollPoints.forEach((point) => {
            if (scrollPercentage >= point && !trackedPointsRef.current.includes(point)) {
              EpigramEvents.landing.scroll(point as 25 | 50 | 75 | 100);

              trackedPointsRef.current = [...trackedPointsRef.current, point];
            }
          });
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
