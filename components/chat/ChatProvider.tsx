'use client';

import { useEffect } from 'react';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useChatStore } from '@/stores/chat.store';
import RenderChatOnPage from './RenderChatOnPage';

export default function ChatProvider({ isLogin }: { isLogin: boolean }) {
  const setMessages = useChatStore((s) => s.setMessages);

  useEffect(() => {
    if (!isLogin) return;

    chatSocket.connect();

    chatSocket.onMessage((msg: any) => {
      setMessages(msg.conversationId, (prev) => [...prev, msg]);
    });

    return () => {
      chatSocket.offAll();
      chatSocket.disconnect();
    };
  }, [isLogin]);

  return <RenderChatOnPage />;
}
