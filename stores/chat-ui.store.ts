import { create } from 'zustand';

type ChatState = {
  openConvo: boolean;
  setOpenConvo: () => void;
};

export const useChatStoreUI = create<ChatState>((set) => ({
  openConvo: false,
  setOpenConvo: () => {
    set((state) => ({ openConvo: !state.openConvo }));
  },
}));
