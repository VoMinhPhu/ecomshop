import { getConversationFn, getConversationsFn, getMessagesFn } from '@/lib/api/chat.api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useGetConversation = () => {
  return useQuery({
    queryKey: ['conversation'],
    queryFn: getConversationFn,
    staleTime: 1000 * 60 * 10,
  });
};

// const useGetMessage = (conversationId: string) => {
//   return useQuery({
//     queryKey: [conversationId, 'conversation'],
//     queryFn: () => getMessagesFn(conversationId),
//     enabled: !!conversationId,
//     staleTime: 1000 * 60 * 10,
//   });
// };

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

//For admin
const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: getConversationsFn,
    staleTime: 1000 * 60 * 10,
  });
};

export { useGetConversation, useGetMessage, useGetConversations };
