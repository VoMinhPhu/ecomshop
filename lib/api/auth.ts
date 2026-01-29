import { LoginPayload, RegisterPayload, ResetPasswordPayload } from '@/types/auth';
import axiosInstance from '../axiosInstance';
import { FormChangePasswordType, FormForgotPasswordType, FormSetPasswordType } from '@/schemas/auth';

const loginFn = async (paload: LoginPayload) => {
  const { data } = await axiosInstance.post('/auth/login', paload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

const changePasswordFn = async (payload: FormChangePasswordType) => {
  const { data } = await axiosInstance.post('/auth/change-password', payload);

  return data;
};

const setPasswordFn = async (payload: FormSetPasswordType) => {
  const { data } = await axiosInstance.post('/auth/set-password', payload);

  return data;
};

const resetPasswordFn = async (payload: ResetPasswordPayload) => {
  const { data } = await axiosInstance.post('/auth/reset-password', payload);

  return data;
};

const forgotPasswordFn = async (payload: FormForgotPasswordType) => {
  const { data } = await axiosInstance.post('/auth/forgot-password', payload);

  return data;
};

const verifyAccountFn = async (code: string): Promise<{ status: string }> => {
  const { data } = await axiosInstance.get(`/auth/verify/${code}`);

  return data;
};

const checkAdminFn = async (): Promise<{ isAdmin: boolean }> => {
  const { data } = await axiosInstance.get('/auth/is-admin');

  return data;
};

const registerFn = async (paload: RegisterPayload): Promise<{ message: string }> => {
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

export {
  loginFn,
  logoutFn,
  registerFn,
  checkAdminFn,
  setPasswordFn,
  resetPasswordFn,
  verifyAccountFn,
  changePasswordFn,
  forgotPasswordFn,
};
