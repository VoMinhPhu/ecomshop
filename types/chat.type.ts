export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'user' | 'admin';
  content: string;
  type: 'text' | 'image';
  isSeen: boolean;
  status?: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  userId: string;
};
