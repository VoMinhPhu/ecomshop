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

const revokedMessagesFn = async (messageId: string) => {
  const res = await axiosInstance.delete('/chat/revoked', {
    data: { messageId },
  });

  return res.data;
};

//Get for admin
const getConversationsFn = async (): Promise<ConversationList> => {
  const { data } = await axiosInstance.get('/chat/admin/conversations');
  return data;
};

export { getMessagesFn, revokedMessagesFn, getConversationFn, getConversationsFn };
