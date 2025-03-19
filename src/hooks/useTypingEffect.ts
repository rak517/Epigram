'use client';

import { useEffect, useState } from 'react';

type Direction = 'forward' | 'backward';

export function useTypingEffect(text: string, speed = 150) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('forward');
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => {
        if (direction === 'forward') {
          if (prevIndex < text.length) {
            return prevIndex + 1;
          } else {
            clearInterval(timer);
            setIsPaused(true);

            setTimeout(() => {
              setDirection('backward');
              setIsPaused(false);
            }, 500);
            return prevIndex;
          }
        } else {
          if (prevIndex > 0) {
            return prevIndex - 1;
          } else {
            setDirection('forward');
            return prevIndex + 1;
          }
        }
      });
    }, speed);

    return () => clearInterval(timer);
  }, [direction, text, speed, isPaused]);

  useEffect(() => {
    if (isPaused) {
      setShowCursor(true);
      return;
    }
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 300);

    return () => clearInterval(blinkInterval);
  }, [isPaused]);

  const typedText = text.slice(0, index);

  return typedText + (showCursor ? '|' : ' ');
}
