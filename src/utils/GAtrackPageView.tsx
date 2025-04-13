'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { trackPageView } from './analytics';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url, document.title);
  }, [isMounted, pathname, searchParams]);

  return null;
}

export default function GAtrackPageView() {
  return (
    <Suspense>
      <PageViewTracker />
    </Suspense>
  );
}
