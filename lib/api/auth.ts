import { LoginPayload, RegisterPayload } from '@/types/auth';
import axiosInstance from '../axiosInstance';

const loginFn = async (paload: LoginPayload) => {
  const { data } = await axiosInstance.post('/auth/login', paload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

const checkAdminFn = async (): Promise<{ isAdmin: boolean }> => {
  const { data } = await axiosInstance.get('/auth/is-admin');

  return data;
};

const registerFn = async (paload: RegisterPayload) => {
  const { data } = await axiosInstance.post('/auth/register', paload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

const logoutFn = async () => {
  const { data } = await axiosInstance.post('/auth/logout');

  return data;
};

export { loginFn, registerFn, logoutFn, checkAdminFn };
