import QueryClientProvider from '@/apis/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>
        <QueryClientProvider>
          {children}
          <ReactQueryDevtools />
          <Modal />
        </QueryClientProvider>
      </body>
    </html>
  );
}
