import { create } from 'zustand';
import { Message } from '../types/chat.type';

type ConversationMeta = {
  username: string;
  avatar: string;
};

type ChatState = {
  messages: Record<string, Message[]>;
  activeConversationId: string;
  conversationMeta: Record<string, ConversationMeta>;
  setActiveConversationId: (id: string) => void;
  setConversationMeta: (conversationId: string, meta: ConversationMeta) => void;
  addMessage: (conversationId: string, msg: Message) => void;
  setMessages: (conversationId: string, updater: Message[] | ((prev: Message[]) => Message[])) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  conversationMeta: {},
  setConversationMeta: (conversationId, meta) =>
    set((state) => ({
      conversationMeta: {
        ...state.conversationMeta,
        [conversationId]: meta,
      },
    })),
  activeConversationId: '',
  setMessages: (conversationId, updater) =>
    set((state) => {
      const prev = state.messages[conversationId] || [];

      const newMessages = typeof updater === 'function' ? updater(prev) : updater;

      return {
        messages: {
          ...state.messages,
          [conversationId]: newMessages,
        },
      };
    }),

  setActiveConversationId: (id) => set({ activeConversationId: id }),

  addMessage: (conversationId, msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), msg],
      },
    })),
}));
