import { create } from 'zustand';
import { Message } from '../types/chat.type';

type ChatState = {
  messages: Record<string, Message[]>;
  addMessage: (conversationId: string, msg: Message) => void;
  setMessages: (conversationId: string, updater: Message[] | ((prev: Message[]) => Message[])) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: {},

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

  addMessage: (conversationId, msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), msg],
      },
    })),
}));
