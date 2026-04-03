'use client';

import useUserStore from '@/stores/userStore';
import CustomerChatSection from './CustomerChatSection';

export default function RenderChatOnPage() {
  const userRole = useUserStore((s) => s.user?.role);

  if (!userRole) return null;

  if (userRole === 'admin') {
    // return <AdminChat />;
    return (
      <div className="fixed bg-white size-13 z-10 border-2 shadow-sm flex items-center justify-center bottom-4 right-4 rounded-full cursor-pointer transition-all duration-100 ease-out">
        admin chat
      </div>
    );
  }

  return <CustomerChatSection />;
}
