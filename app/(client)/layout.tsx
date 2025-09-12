import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '../globals.css';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';

import ToastProvider from '@/components/providers/ToastProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-com Store',
  description:
    'Cửa hàng thương mại điện tử chuyên cung cấp sản phẩm chất lượng – thời trang, điện tử, gia dụng với giá tốt, giao hàng toàn quốc.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <Header />
          <main className="mt-38.25 md:mt-48 lg:mt-31">{children}</main>
          <Footer />
          <ToastProvider />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
