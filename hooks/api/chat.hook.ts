import { getConversationFn, getConversationsFn, getMessagesFn, revokedMessagesFn } from '@/lib/api/chat.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokedMessagesFn,
    onSuccess: () => {
      toast.success('Chat', {
        description: 'Thu hồi tin nhắn thành công.',
        duration: 1500,
      });
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
