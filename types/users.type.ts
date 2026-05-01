export interface UserInfo {
  id: string;
  email: string;
  avatar: string | null;
  status: AccountStatus;
  name: string;
  phone: string | null;
  role: UserRole;
  gender: null | 'male' | 'female';
  dateOfBirth: string | null;
  isVerified: boolean;
  hasPassword: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum AccountStatus {
  ACTIVE = 'active',
  UNACTIVE = 'unactive',
  BANNED = 'banned',
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
  status: AccountStatus;
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
