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
  hasPassword: boolean;
}

export interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  gender: null | 'male' | 'female';
  isVerified: boolean;
}

export type UserListResponse = {
  data: UserListItem[];
  total: number;
  page: number;
  limit: number;
};

export interface GetAllCustomerParams {
  page?: number;
  limit?: number;
  email?: string;
}

export interface GetDetailUser extends UserInfo {
  createdAt: string;
  updatedAt: string;
}
