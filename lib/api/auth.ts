import { LoginPayload, RegisterPayload } from '@/types/auth';

import { AxiosError } from 'axios';
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginFn = async (paload: LoginPayload) => {
  const { data } = await axiosInstance.post('/auth/login', paload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast.success('Đăng nhập', {
        description: 'Đăng nhập thành công',
        duration: 2000,
      });
      setTimeout(() => router.push('/account'), 1500);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        toast.error('Đăng nhập', {
          description: 'Tài khoản hoặc mật khẩu không chính xác.',
          duration: 3500,
        });
        return;
      }
      toast.error('Đăng nhập', {
        description: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        duration: 3500,
      });
    },
  });
};

const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      toast.success('Đăng Ký', {
        description: 'Đăng Ký thành công, vui lòng kiểm tra email để xác thực tài khoản.',
        duration: 2000,
      });
      setTimeout(() => router.push('/account'), 2500);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        toast.error('Đăng ký', {
          description: 'Tài khoản đã tồn tại, vui lòng sử dụng tài khoản khác.',
          duration: 3500,
        });
        return;
      }
      toast.error('Đăng ký', {
        description: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        duration: 3500,
      });
    },
  });
};
export { useLogin, useRegister };
