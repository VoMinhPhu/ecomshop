'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useUserStore from '@/stores/userStore';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useGetConversation, useGetMessage } from '@/hooks/api/chat.hook';
import { useChatStore } from '@/stores/chat.store';

export const useClientChat = () => {
  const { messages, setMessages } = useChatStore();

  const { data: convo = {}, isLoading } = useGetConversation();
  const { getMessages } = useGetMessage();

  const [conversationId, setConversationId] = useState('');
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (isLoading || !convo?.id) return;

    setConversationId(convo.id);
    console.log('joining room:', convo.id);
    chatSocket.join(convo.id);
    chatSocket.seen(convo.id);

    const load = async () => {
      const msgs = await getMessages(convo.id);
      setMessages(convo.id, msgs);
    };

    load();
  }, [convo?.id, isLoading]);

  const sendMessage = (content: string) => {
    if (!conversationId || !user) return;

    const requestId = uuidv4();
    const tempMsg = {
      id: `temp-${requestId}`,
      requestId,
      conversationId,
      senderId: user.id,
      senderRole: user.role,
      content,
      type: 'text',
      metadata: null,
      isSeen: false,
      createdAt: new Date().toISOString(),
      status: 'sending',
    };

    setMessages(conversationId, (prev: any[]) => [...prev, tempMsg]);

    const timer = setTimeout(() => {
      setMessages(conversationId, (prev: any[]) =>
        prev.map((m) => (m.requestId === requestId && m.status === 'sending' ? { ...m, status: 'failed' } : m)),
      );
    }, 12000);

    chatSocket.sendMessage(
      { conversationId, content, type: 'text', requestId },
      () => clearTimeout(timer), // server ack → hủy fallback timeout
    );
  };

  const seen = () => {
    if (!conversationId) return;
    chatSocket.seen(conversationId);
  };

  return {
    messages: messages[conversationId] || [],
    sendMessage,
    seen,
  };
};
