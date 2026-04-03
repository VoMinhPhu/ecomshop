import { useEffect } from 'react';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useChatStore } from '@/stores/chat.store';

export const useChatCore = () => {
  const { messages, setMessages, addMessage } = useChatStore();

  useEffect(() => {
    chatSocket.connect();

    chatSocket.onMessage((msg: any) => {
      setMessages(msg.conversationId, (prev: any[]) => {
        const idx = prev.findIndex((m) => m.requestId && m.requestId === msg.requestId);

        if (idx !== -1) {
          const newList = [...prev];
          newList[idx] = { ...msg, status: 'sent' };
          return newList;
        }

        return [...prev, { ...msg, status: 'sent' }];
      });
    });

    return () => {
      chatSocket.off();
      chatSocket.disconnect();
    };
  }, []);

  return {
    messages,
    setMessages,
  };
};
