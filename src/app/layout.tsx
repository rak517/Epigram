import { Pretendard } from '@/fonts';
import './globals.css';
import Modal from '@/components/ui/modals';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={Pretendard.className}>
        {children}
        <Modal />
      </body>
    </html>
  );
}
