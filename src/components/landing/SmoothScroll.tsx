'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { LenisRef, ReactLenis } from 'lenis/react';
import { frame, cancelFrame } from 'motion/react';

export default function useSmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);
  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      {children}
    </ReactLenis>
  );
}
