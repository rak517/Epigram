import QueryClientProvider from '@/apis/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';
import './globals.css';
import { ToastProvider } from '@/utils/toast/ToastContext';
import { ToastContainer } from '@/utils/toast/Toast';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import GAtrackPageView from '@/utils/GAtrackPageView';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
        <QueryClientProvider>
          <ToastProvider>
            {children}
            <ReactQueryDevtools />
            <Modal />
            <ToastContainer />
          </ToastProvider>
          <GAtrackPageView />
        </QueryClientProvider>
      </body>
    </html>
  );
}
