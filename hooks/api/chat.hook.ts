import { getConversationFn, getConversationsFn, getMessagesFn, revokedMessagesFn } from '@/lib/api/chat.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useChatStore } from '@/stores/chat.store';

const useGetConversation = () => {
  return useQuery({
    queryKey: ['conversation'],
    queryFn: getConversationFn,
    staleTime: 1000 * 60 * 10,
  });
};

const useGetMessage = () => {
  const queryClient = useQueryClient();

  const getMessages = (conversationId: string) => {
    return queryClient.fetchQuery({
      queryKey: ['conversation', conversationId],
      queryFn: () => getMessagesFn(conversationId),
      staleTime: 1000 * 60 * 10,
    });
  };

  return { getMessages };
};

const useRevokedMessage = () => {
  // const queryClient = useQueryClient();
  const setMessages = useChatStore((s) => s.setMessages);

  return useMutation({
    mutationFn: revokedMessagesFn,
    onSuccess: (data) => {
      toast.success('Chat', {
        description: 'Thu hồi tin nhắn thành công.',
        duration: 1500,
      });

      if (data?.conversationId && data?.messageId) {
        const store = useChatStore.getState();
        const prev = store.messages[data.conversationId] || [];
        const isLastMessage = prev.length > 0 && prev[prev.length - 1].id === data.messageId;

        if (isLastMessage) {
          const meta = store.conversationMeta[data.conversationId];
          if (meta) {
            store.updateLastMessage(data.conversationId, {
              lastMessage: meta.lastMessage || '',
              lastMessageAt: meta.lastMessageAt || new Date().toISOString(),
              unreadCount: meta.unreadCount,
              revoked: true,
            });
          }
        }

        store.setMessages(data.conversationId, (prevMsgs: any[]) =>
          prevMsgs.map((m) => (m.id === data.messageId ? { ...m, revoked: true } : m)),
        );
      }
    },
    onError: () => {
      toast.error('Chat', {
        description: 'Thu hồi tin nhắn thất bại.',
      });
    },
  });
};

//For admin
const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: getConversationsFn,
    staleTime: 1000 * 60 * 10,
  });
};

export { useGetConversation, useGetMessage, useGetConversations, useRevokedMessage };
