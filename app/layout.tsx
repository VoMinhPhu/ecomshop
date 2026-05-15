import { Inter } from 'next/font/google';

import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import ToastProvider from '@/components/providers/ToastProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import ChatProviderGlobalLoader from '@/components/providers/ChatProviderGlobalLoader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <ReactQueryProvider>
          {children}
          <ToastProvider />
          <ChatProviderGlobalLoader />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
