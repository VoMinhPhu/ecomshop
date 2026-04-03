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

//Get for admin (mock)
const getConversationsFn = async (conversationId: string) => {
  const { data } = await axiosInstance.get('/chat/messages', {
    params: { conversationId },
  });
  return data;
};

export { getMessagesFn, getConversationFn, getConversationsFn };
