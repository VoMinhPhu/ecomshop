import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';
import { loginFn, logoutFn, registerFn } from '@/lib/api/auth';

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast.success('Đăng nhập', {
        description: 'Đăng nhập thành công',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['token'] });

      setTimeout(() => router.push('/account'), 1500);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        toast.error('Đăng nhập', {
          description: 'Tài khoản hoặc mật khẩu không chính xác.',
          duration: 2500,
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

const useLogout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      (toast.success('Đăng xuất', {
        description: 'Đăng xuất thành công.',
        duration: 3000,
      }),
        setTimeout(() => {
          clearUser();
          router.push('/login');
        }, 1500));

      queryClient.invalidateQueries({ queryKey: ['address'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};

export { useLogin, useRegister, useLogout };
