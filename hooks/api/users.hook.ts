import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMeFn,
  getAllUserFn,
  updateAvatarFn,
  updateUserInfo,
  getDetailUserFn,
  updateAccountStatusFn,
} from '@/lib/api/users.api';

import { toast } from 'sonner';
import { AccountStatus, GetAllCustomerParams } from '@/types/users.type';

const useGetMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMeFn,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const useGetDetailUser = (id: string) => {
  return useQuery({
    queryKey: ['user', 'detail', id],
    queryFn: () => getDetailUserFn(id),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const useGetAllUser = (params: GetAllCustomerParams) => {
  const { page, limit, email } = params;

  return useQuery({
    queryKey: ['users', page, limit, email],
    queryFn: () => getAllUserFn({ page, limit, email }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatarFn,
    onSuccess: () => {
      toast.success('Cập nhật ảnh đại diện', {
        description: 'Cập nhật ảnh đại diện thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast.error('Cập nhật ảnh đại diện', {
        description: err.message,
        duration: 2500,
      });
    },
  });
};

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      toast.success('Cập nhật thông tin', {
        description: 'Cập nhật thông tin thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error('Cập nhật thông tin', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useUpdateAccountStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccountStatusFn,
    onSuccess: (data) => {
      if (data.accountStatus === AccountStatus.ACTIVE) {
        toast.success('Kích hoạt tài khoản', {
          description: 'Kích hoạt tài khoản thành công.',
          duration: 2500,
        });
      } else if (data.accountStatus === AccountStatus.BANNED) {
        toast.success('Cấm tài khoản', {
          description: 'Cấm tài khoản thành công.',
          duration: 2500,
        });
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'detail', data.userId] });
    },
    onError: () => {
      toast.error('Cập nhật thông tin', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetMe, useGetDetailUser, useGetAllUser, useUpdateAvatar, useUpdateUserInfo, useUpdateAccountStatus };
