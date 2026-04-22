import { useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { useGetConversations, useGetMessage } from '@/hooks/api/chat.hook';
import { useChatStore } from '@/stores/chat.store';
import useUserStore from '@/stores/userStore';

import { chatSocket } from '@/lib/socket/chat.socket';

export const useAdminChat = () => {
  const { data: conversations = [] } = useGetConversations();
  const user = useUserStore((s) => s.user);

  const {
    setMessages,
    setConversationMeta,
    activeConversationId,
    messages: allMessages,
    setActiveConversationId,
  } = useChatStore();

  const activeMessages = allMessages[activeConversationId] || [];

  const queryClient = useQueryClient();
  const { getMessages } = useGetMessage();

  // switch conversation
  const handleSelectConversation = async (conversationId: string) => {
    if (activeConversationId) chatSocket.leave(activeConversationId);

    chatSocket.join(conversationId);
    setActiveConversationId(conversationId);

    chatSocket.seen(conversationId);

    const convo = conversations.find((c) => c.id === conversationId);
    if (convo) {
      setConversationMeta(conversationId, {
        username: convo.user.name,
        avatar: convo.user.avatar,
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

  return {
    conversations,
    activeConversationId,
    messages: activeMessages,
    sendMessage,
    setActiveConversationId: handleSelectConversation,
  };
};
