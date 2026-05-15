'use client';

import dynamic from 'next/dynamic';
import useUserStore from '@/stores/user.store';

const RenderChatOnPage = dynamic(() => import('./RenderChatOnPage'), {
  ssr: false,
});

export default function ChatProvider() {
  const email = useUserStore((s) => s.user?.email);

  if (!email) return null;

  return <RenderChatOnPage />;
}
