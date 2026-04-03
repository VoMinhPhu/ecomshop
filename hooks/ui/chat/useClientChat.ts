import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useUserStore from '@/stores/userStore';
import { chatSocket } from '@/lib/socket/chat.socket';
import { getConversationFn, getMessagesFn } from '@/lib/api/chat.api';

import { useChatCore } from './useChatCore';

export const useClientChat = () => {
  const { messages, setMessages } = useChatCore();
  const [conversationId, setConversationId] = useState('');

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    const init = async () => {
      const convo = await getConversationFn();

      setConversationId(convo.id);

      chatSocket.join(convo.id);

      const msgs = await getMessagesFn(convo.id);
      setMessages(convo.id, msgs);
    };

    init();
  }, []);

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
      type: 'text', // text | image
      metadata: null,
      isSeen: false,
      createdAt: new Date().toISOString(),
      status: 'sending',
    };

    setMessages(conversationId, (prev: any[]) => [...prev, tempMsg]);

    chatSocket.sendMessage({
      conversationId,
      content,
      type: 'text',
      requestId,
    });

    setTimeout(() => {
      setMessages(conversationId, (prev: any[]) =>
        prev.map((m) => (m.requestId === requestId && m.status === 'sending' ? { ...m, status: 'failed' } : m)),
      );
    }, 5000);
  };

  return {
    messages: messages[conversationId] || [],
    sendMessage,
  };
};
