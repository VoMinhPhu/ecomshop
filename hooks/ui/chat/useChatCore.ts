import { useEffect } from 'react';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useChatStore } from '@/stores/chat.store';

export const useChatCore = () => {
  const { messages, setMessages } = useChatStore();

  useEffect(() => {
    chatSocket.onMessage((msg: any) => {
      setMessages(msg.conversationId, (prev: any[]) => {
        const existById = prev.findIndex((m) => m.id === msg.id);
        if (existById !== -1) return prev;

        // replace optimistic message theo requestId
        const existByRequestId = prev.findIndex((m) => m.requestId && m.requestId === msg.requestId);
        if (existByRequestId !== -1) {
          const newList = [...prev];
          newList[existByRequestId] = { ...msg, status: 'sent' };
          return newList;
        }

        return [...prev, { ...msg, status: 'sent' }];
      });
    });

    chatSocket.onSeenUpdate((data: { conversationId: string }) => {
      setMessages(data.conversationId, (prev: any[]) => prev.map((m) => (m.isSeen ? m : { ...m, isSeen: true })));
    });

    return () => {
      chatSocket.offMessage();
      chatSocket.offSeenUpdate();
    };
  }, []);

  return { messages, setMessages };
};
