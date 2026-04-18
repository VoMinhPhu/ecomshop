import { ConversationList } from '@/types/chat.type';
import axiosInstance from '../axiosInstance';

const getConversationFn = async () => {
  const { data } = await axiosInstance.get('/chat/me');
  return data;
};

const getMessagesFn = async (conversationId: string) => {
  const { data } = await axiosInstance.get('/chat/messages', {
    params: { conversationId },
  });
  return data;
};

//Get for admin
const getConversationsFn = async (): Promise<ConversationList> => {
  const { data } = await axiosInstance.get('/chat/admin/conversations');
  return data;
};

export { getMessagesFn, getConversationFn, getConversationsFn };
