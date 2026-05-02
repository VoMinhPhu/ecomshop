import { UserInfo, UserState } from '@/types/users.type';
import { create } from 'zustand';

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: UserInfo) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
