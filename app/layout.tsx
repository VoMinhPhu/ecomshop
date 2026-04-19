import { Inter } from 'next/font/google';

import './globals.css';
import ToastProvider from '@/components/providers/ToastProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import ChatProviderGlobalLoader from '@/components/providers/ChatProviderGlobalLoader';

import { cookies } from 'next/headers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLogin = !!cookieStore.get('refresh_token');

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <ToastProvider />
          {isLogin && <ChatProviderGlobalLoader />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
