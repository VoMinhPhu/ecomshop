'use client';

import dynamic from 'next/dynamic';
import useUserStore from '@/stores/user.store';

const ChatProviderGlobal = dynamic(() => import('./ChatProviderGlobal'), { ssr: false });

export default function ChatProviderGlobalLoader() {
  const email = useUserStore((s) => s.user?.email);

  if (!email) {
    return null;
  }

  return <ChatProviderGlobal />;
}
