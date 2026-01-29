import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';
import {
  loginFn,
  logoutFn,
  registerFn,
  checkAdminFn,
  setPasswordFn,
  resetPasswordFn,
  verifyAccountFn,
  changePasswordFn,
  forgotPasswordFn,
} from '@/lib/api/auth';

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast.success('Đăng nhập', {
        description: 'Đăng nhập thành công',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['address'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['token'] });
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

const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordFn,
    onSuccess: () => {
      toast.success('Đổi mật khẩu', {
        description: 'Đổi mật khẩu thành công.',
        duration: 1500,
      });
    },
    onError: (err: AxiosError<{ message: string; error: string; statusCode: number }>) => {
      toast.error('Đổi mật khẩu', {
        description: 'Mật khẩu cũ không chính xác.',
        duration: 2000,
      });
    },
  });
};

const useSetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setPasswordFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('Đặt mật khẩu', {
        description: 'Đặt mật khẩu thành công.',
        duration: 1500,
      });
    },
    onError: (err: AxiosError<{ message: string; error: string; statusCode: number }>) => {
      toast.error('Đặt mật khẩu', {
        description: 'Hiện không thể đặt mật khẩu.',
        duration: 2000,
      });
    },
  });
};

const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordFn,
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu', {
        description: 'Đặt lại mật khẩu thành công.',
        duration: 1500,
      });
    },
    onError: (err: AxiosError<{ message: string; error: string; statusCode: number }>) => {
      if (err.status === 404) {
        toast.error('Đặt lại mật khẩu', {
          description: 'Token không hợp lệ.',
          duration: 2000,
        });
        return;
      }
      toast.error('Đặt lại mật khẩu', {
        description: 'Token đã hết hạn.',
        duration: 2000,
      });
    },
  });
};

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordFn,
    onSuccess: () => {
      toast.success('Quên mật khẩu', {
        description: 'Gửi yêu cầu đặt lại mật khẩu thành công.',
        duration: 1500,
      });
    },
    onError: (err: AxiosError<{ message: string; error: string; statusCode: number }>) => {
      if (err.status === 404) {
        toast.error('Quên mật khẩu', {
          description: 'Tài khoản không tồn tại trong hệ thống.',
          duration: 2000,
        });
        return;
      }
      toast.error('Quên mật khẩu', {
        description: 'Hiện không thể đặt mật khẩu.',
        duration: 2000,
      });
    },
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      toast.success('Đăng Ký', {
        description: 'Đăng Ký thành công, vui lòng kiểm tra email để xác thực tài khoản.',
        duration: 2000,
      });
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
      toast.success('Đăng xuất', {
        description: 'Đăng xuất thành công.',
        duration: 3000,
      });
      setTimeout(() => {
        clearUser();
        router.push('/');
      }, 1500);

      queryClient.invalidateQueries({ queryKey: ['order'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

const useCheckIsAdmin = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: checkAdminFn,
    staleTime: 1000 * 60 * 10,
    retry: 0,
  });
};

const useVerifyAccount = (code: string) => {
  return useQuery({
    queryKey: ['verify'],
    queryFn: () => verifyAccountFn(code),
    retry: 1,
  });
};

export {
  useLogin,
  useLogout,
  useRegister,
  useSetPassword,
  useCheckIsAdmin,
  useVerifyAccount,
  useResetPassword,
  useChangePassword,
  useForgotPassword,
};
