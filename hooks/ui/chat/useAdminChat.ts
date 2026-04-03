import { useEffect, useState } from 'react';
import { useChatCore } from './useChatCore';
import { chatSocket } from '@/lib/socket/chat.socket';
import { getConversationsFn, getMessagesFn } from '@/lib/api/chat.api';

export const useAdminChat = () => {
  const { messages, setMessages } = useChatCore();

  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState('');

  //Need fix to join admin_room and 1 convo
  useEffect(() => {
    const init = async () => {
      const convos = await getConversationsFn('');
      setConversations(convos);

      // join tất cả room
      convos.forEach((c: any) => chatSocket.join(c.id));

      // set room đầu tiên
      if (convos.length > 0) {
        const firstId = convos[0].id;
        setActiveConversationId(firstId);

        const msgs = await getMessagesFn(firstId);
        setMessages(firstId, msgs);
      }
    };

    init();
  }, []);

  const sendMessage = (content: string) => {
    if (!activeConversationId) return;

    chatSocket.sendMessage({
      conversationId: activeConversationId,
      content,
      type: 'text',
    });
  };

  return {
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages: messages[activeConversationId] || [],
    sendMessage,
  };
};
