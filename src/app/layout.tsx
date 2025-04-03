import QueryClientProvider from '@/apis/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';
import './globals.css';
import { ToastProvider } from '@/utils/toast/ToastContext';
import { ToastContainer } from '@/utils/toast/Toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>
        <QueryClientProvider>
          <ToastProvider>
            {children}
            <ReactQueryDevtools />
            <Modal />
            <ToastContainer />
          </ToastProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
