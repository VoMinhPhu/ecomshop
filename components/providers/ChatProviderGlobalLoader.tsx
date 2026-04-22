'use client';

import dynamic from 'next/dynamic';

const ChatProviderGlobal = dynamic(() => import('./ChatProviderGlobal'), { ssr: false });

export default function ChatProviderGlobalLoader() {
  return <ChatProviderGlobal />;
}
