import LandingHeader from '@/components/ui/header/LandingHeader';
import SmoothScroll from '@/components/landing/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <LandingHeader showIcon />
      {children}
    </SmoothScroll>
  );
}
