'use client';

import Epigrams from '@/components/landing/Epigrams';
import Feature from '@/components/landing/Feature';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import { useRef } from 'react';

export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-background-100 min-h-screen'>
      <Hero handleScroll={handleScroll} />
      <Feature ref={targetRef} />
      <Epigrams />
      <Footer />
    </div>
  );
}
