'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Message } from '@/types/chat.type';

import { useChatStore } from '@/stores/chat.store';

import { chatSocket } from '@/lib/socket/chat.socket';

export default function ChatProviderGlobal() {
  const queryClient = useQueryClient();
  const setMessages = useChatStore((s) => s.setMessages);
  const updateLastMessage = useChatStore((s) => s.updateLastMessage);

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

      chatSocket.join();

      const activeConversationId = useChatStore.getState().activeConversationId;
      if (activeConversationId) {
        chatSocket.join(activeConversationId);
      }
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

      updateLastMessage(msg.conversationId, {
        lastMessage: msg.content,
        lastMessageAt: msg.createdAt,
        unreadCount: msg.unreadCount,
        revoked: false,
      });
    });

    chatSocket.onSeenUpdate((data: { conversationId: string }) => {
      setMessages(data.conversationId, (prev: any[]) => prev.map((m) => (m.isSeen ? m : { ...m, isSeen: true })));
    });

    chatSocket.onMessageRevoked(({ messageId }) => {
      const store = useChatStore.getState();
      const allMessages = store.messages;

      Object.keys(allMessages).forEach((conversationId) => {
        const prev = allMessages[conversationId] || [];
        const isLastMessage = prev.length > 0 && prev[prev.length - 1].id === messageId;

        setMessages(conversationId, (p) => p.map((m) => (m.id === messageId ? { ...m, revoked: true } : m)));

        if (isLastMessage) {
          const meta = store.conversationMeta[conversationId];
          if (meta) {
            updateLastMessage(conversationId, {
              lastMessage: meta.lastMessage || '',
              lastMessageAt: meta.lastMessageAt || new Date().toISOString(),
              unreadCount: meta.unreadCount,
              revoked: true,
            });
          }
        }
      });
    });

    chatSocket.onNotify((data: { conversationId: string; message: Message }) => {
      const conversationMeta = useChatStore.getState().conversationMeta;
      const activeConversationId = useChatStore.getState().activeConversationId;

      if (data.conversationId === activeConversationId) {
        updateLastMessage(data.conversationId, {
          lastMessage: data.message.content,
          lastMessageAt: data.message.createdAt,
          unreadCount: 0,
          revoked: false,
        });
      } else {
        updateLastMessage(data.conversationId, {
          lastMessage: data.message.content,
          lastMessageAt: data.message.createdAt,
          unreadCount: conversationMeta[data.conversationId]
            ? conversationMeta[data.conversationId].unreadCount + 1
            : 1,
          revoked: false,
        });
      }

      setMessages(data.conversationId, (prev: any[]) => {
        const exist = prev.find((m) => m.id === data.message.id);
        if (exist) return prev;
        return [...prev, { ...data.message, status: 'sent' }];
      });

      const isNewConversation =
        !conversationMeta[data.conversationId] || !conversationMeta[data.conversationId].user?.username;

      if (isNewConversation) {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
    });

    return () => {
      chatSocket.offAll();
      chatSocket.disconnect();
    };
  }, []);

  return null;
}
