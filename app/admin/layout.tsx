import type { Metadata } from 'next';

import NavAdmin from '@/components/admin/nav/NavAdmin';
import HeaderAdmin from '@/components/admin/nav/HeaderAdmin';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AdminGuard from '@/components/providers/AdminGuard';
import { ChatProviderAdmin } from '@/components/admin/chats/ChatProviderAdmin';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Trang quản trị hệ thống',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminGuard>
        <ChatProviderAdmin>
          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
              <HeaderAdmin />
              <div className="flex flex-1">
                <NavAdmin />
                <SidebarInset>{children}</SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </ChatProviderAdmin>
      </AdminGuard>
    </>
  );
}
