'use client';

import { createContext, useContext, useEffect } from 'react';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useQueryClient } from '@tanstack/react-query';
import { useChatCore } from '@/hooks/ui/chat/useChatCore';

const ChatSocketContext = createContext(null);

export const ChatProviderAdmin = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { setMessages } = useChatCore();

  useEffect(() => {
    chatSocket.connect();
    chatSocket.join('admin_room');

    chatSocket.onNotify((data: any) => {
      // update conversations cache
      queryClient.setQueryData(['conversations'], (old: any[] = []) => {
        const idx = old.findIndex((c) => c.id === data.conversationId);

        if (idx === -1) {
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
          return old;
        }

        const updated = [...old];
        const item = {
          ...updated[idx],
          lastMessage: data.message.content,
          unreadCount: updated[idx].unreadCount + 1,
        };

        updated.splice(idx, 1);
        return [item, ...updated];
      });

      // push message vào store
      setMessages(data.conversationId, (prev: any[]) => {
        const exist = prev.find((m) => m.id === data.message.id);
        if (exist) return prev;
        return [...prev, { ...data.message, status: 'sent' }];
      });
    });

    return () => {
      chatSocket.offNotify();
      chatSocket.offAll();
      chatSocket.disconnect();
    };
  }, []);

  return <ChatSocketContext.Provider value={null}>{children}</ChatSocketContext.Provider>;
};

export const useChatSocket = () => useContext(ChatSocketContext);
