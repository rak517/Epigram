import QueryClientProvider from '@/apis/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';
import './globals.css';
import LandingHeader from '@/components/ui/header/LandingHeader';
import SmoothScroll from '@/components/landing/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>
        <QueryClientProvider>
          <SmoothScroll>
            <LandingHeader showIcon />
            {children}
            <ReactQueryDevtools />
            <Modal />
          </SmoothScroll>
        </QueryClientProvider>
      </body>
    </html>
  );
}
