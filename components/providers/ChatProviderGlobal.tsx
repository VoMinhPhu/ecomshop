'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useChatStore } from '@/stores/chat.store';

export default function ChatProviderGlobal() {
  const queryClient = useQueryClient();
  const setMessages = useChatStore((s) => s.setMessages);

  useEffect(() => {
    chatSocket.connect();

    chatSocket.join();

    chatSocket.onDisconnect((reason) => {
      if (reason === 'io server disconnect') {
        toast.error('Chat', {
          description: 'Phiên kết nối đã hết hạn',
        });
      } else {
        toast.error('Chat', {
          description: 'Mất kết nối. Đang thử kết nối lại...',
        });
      }
    });

    chatSocket.onConnectError(() => {
      toast.error('Chat', {
        description: 'Không thể kết nối đến server',
      });
    });

    chatSocket.onReconnect(() => {
      toast.success('Chat', {
        description: 'Đã kết nối lại',
      });
    });

    chatSocket.onMessage((msg: any) => {
      setMessages(msg.conversationId, (prev: any[]) => {
        const existById = prev.findIndex((m) => m.id === msg.id);
        if (existById !== -1) return prev;

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

    chatSocket.onMessageRevoked(({ messageId }) => {
      const allMessages = useChatStore.getState().messages;

      Object.keys(allMessages).forEach((conversationId) => {
        setMessages(conversationId, (prev) => prev.map((m) => (m.id === messageId ? { ...m, revoked: true } : m)));
      });
    });

    chatSocket.onNotify((data: any) => {
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

      setMessages(data.conversationId, (prev: any[]) => {
        const exist = prev.find((m) => m.id === data.message.id);
        if (exist) return prev;
        return [...prev, { ...data.message, status: 'sent' }];
      });
    });

    return () => {
      chatSocket.offAll();
      chatSocket.disconnect();
    };
  }, []);

  return null;
}
