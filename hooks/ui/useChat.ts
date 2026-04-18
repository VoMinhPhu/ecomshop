import { useEffect, useState } from 'react';
import { chatSocket } from '@/lib/socket/chat.socket';
import { useChatStore } from '@/stores/chat.store';
import { getConversationFn, getMessagesFn } from '@/lib/api/chat.api';

export const useChat = () => {
  const { messages, setMessages, addMessage } = useChatStore();
  const [conversationId, setConversationId] = useState('');

  useEffect(() => {
    const init = async () => {
      chatSocket.connect();

      const convo = await getConversationFn();
      setConversationId(convo.id);

      chatSocket.join(conversationId);

      const msgs = await getMessagesFn(convo.id);
      setMessages(convo.id, msgs);
    };

    init();

    chatSocket.onMessage((msg: any) => {
      addMessage(msg.conversationId, msg);
    });

    return () => {
      chatSocket.offAll();
      chatSocket.disconnect();
    };
  }, []);

  const sendMessage = (content: string) => {
    chatSocket.sendMessage({
      conversationId,
      content,
      type: 'text', // text | image
    });
  };

  return {
    messages,
    sendMessage,
  };
};
