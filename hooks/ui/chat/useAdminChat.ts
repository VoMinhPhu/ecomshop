import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { useGetConversations, useGetMessage } from '@/hooks/api/chat.hook';

import useUserStore from '@/stores/user.store';
import { useChatStore } from '@/stores/chat.store';

import { chatSocket } from '@/lib/socket/chat.socket';

export const useAdminChat = () => {
  let { data: conversations = [], isLoading: loadingConvos } = useGetConversations();
  const user = useUserStore((s) => s.user);

  const {
    setMessages,
    setConversationMeta,
    updateLastMessage,
    activeConversationId,
    conversationMeta,
    messages: allMessages,
    setActiveConversationId,
  } = useChatStore();

  useEffect(() => {
    if (loadingConvos) return;
    
    const currentMeta = useChatStore.getState().conversationMeta;

    conversations.forEach((c) => {
      const existing = currentMeta[c.id];
      const apiTime = c.lastMessageAt ? new Date(c.lastMessageAt).getTime() : 0;
      const stateTime = existing?.lastMessageAt ? new Date(existing.lastMessageAt).getTime() : 0;

      if (!existing || apiTime >= stateTime) {
        setConversationMeta(c.id, {
          id: c.id,
          lastMessage: c.lastMessage,
          lastMessageAt: c.lastMessageAt,
          unreadCount: c.unreadCount,
          user: {
            username: c.user.name,
            avatar: c.user.avatar,
          },
        });
      } else {
        setConversationMeta(c.id, {
          ...existing,
          id: c.id,
          user: {
            username: c.user.name,
            avatar: c.user.avatar,
          },
        });
      }
    });
  }, [loadingConvos, conversations, setConversationMeta]);

  const activeMessages = allMessages[activeConversationId] || [];

  const queryClient = useQueryClient();
  const { getMessages } = useGetMessage();

  // switch conversation
  const handleSelectConversation = async (conversationId: string) => {
    if (activeConversationId) chatSocket.leave(activeConversationId);

    chatSocket.join(conversationId);
    setActiveConversationId(conversationId);

    chatSocket.seen(conversationId);

    // const convo = conversations.find((c) => c.id === conversationId);
    const convo = conversationMeta[conversationId];

    if (convo) {
      setConversationMeta(conversationId, {
        id: convo.id,
        lastMessage: convo.lastMessage,
        lastMessageAt: convo.lastMessageAt,
        unreadCount: convo.unreadCount,
        user: {
          username: convo.user.username,
          avatar: convo.user.avatar,
        },
      });
    }

    if (!allMessages[conversationId]) {
      const msgs = await getMessages(conversationId);
      setMessages(conversationId, msgs);
    }

    queryClient.setQueryData(['conversations'], (old: any[] = []) =>
      old.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
    );
  };

  // send message
  const sendMessage = (content: string) => {
    if (!activeConversationId || !user) return;

    const requestId = uuidv4();

    const tempMsg = {
      id: `temp-${requestId}`,
      requestId,
      conversationId: activeConversationId,
      senderId: user.id,
      senderRole: user.role,
      content,
      type: 'text',
      metadata: null,
      isSeen: false,
      createdAt: new Date().toISOString(),
      status: 'sending',
    };

    setMessages(activeConversationId, (prev: any[]) => [...prev, tempMsg]);

    // fallback
    const timer = setTimeout(() => {
      setMessages(activeConversationId, (prev: any[]) =>
        prev.map((m) => (m.requestId === requestId && m.status === 'sending' ? { ...m, status: 'failed' } : m)),
      );
    }, 10000);

    chatSocket.sendMessage(
      {
        conversationId: activeConversationId,
        content,
        type: 'text',
        requestId,
      },
      () => clearTimeout(timer),
    );
  };

  const seen = (conversationId: string) => {
    if (!conversationId) return;
    chatSocket.seen(conversationId);

    updateLastMessage(conversationId, {
      lastMessage: conversationMeta[conversationId].lastMessage ?? '',
      lastMessageAt: conversationMeta[conversationId].lastMessageAt ?? '',
      unreadCount: 0,
    });
  };

  return {
    loadingConvos,
    conversations,
    conversationMeta,
    activeConversationId,
    messages: activeMessages,
    seen,
    sendMessage,
    setActiveConversationId: handleSelectConversation,
  };
};
