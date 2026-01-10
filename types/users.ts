export interface UserInfo {
  id: string;
  email: string;
  avatar: string | null;
  status: string;
  name: string;
  phone: string | null;
  role: string;
  gender: null | 'male' | 'female';
  dateOfBirth: string | null;
  isVerified: boolean;
}

export interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}
