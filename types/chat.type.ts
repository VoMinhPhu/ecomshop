export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  revoked: boolean;
  senderRole: 'user' | 'admin';
  content: string;
  type: 'text' | 'image';
  isSeen: boolean;
  status?: string;
  createdAt: string;
};

type Conversation = {
  id: string;
  lastMessage: string;
  unreadCount: number;
  user: {
    name: string;
    avatar: string;
  };
};

export type ConversationList = Conversation[];
