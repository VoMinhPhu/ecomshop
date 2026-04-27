'use client';

import useUserStore from '@/stores/userStore';

import AdminChat from './AdminChat';
import CustomerChatSection from './CustomerChatSection';

export default function RenderChatOnPage() {
  const userRole = useUserStore((s) => s.user?.role);

  if (!userRole) return null;

  if (userRole === 'admin') {
    return <AdminChat />;
  }

  return <CustomerChatSection />;
}
