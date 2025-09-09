import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '../globals.css';
import NavAdmin from '@/components/admin/nav/NavAdmin';
import HeaderAdmin from '@/components/admin/nav/HeaderAdmin';
import ToastProvider from '@/components/providers/ToastProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
  title: 'Admin Dashboard',
  description: 'Trang quản trị hệ thống',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <ReactQueryProvider>
          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
              <HeaderAdmin />
              <div className="flex flex-1">
                <NavAdmin />
                <SidebarInset>{children}</SidebarInset>
              </div>
            </SidebarProvider>
          </div>
          <ToastProvider />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
