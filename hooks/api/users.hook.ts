import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllUserFn, getDetailUserFn, getMeFn, updateAvatarFn, updateUserInfo } from '@/lib/api/users.api';

import { toast } from 'sonner';
import { GetAllCustomerParams } from '@/types/users.type';

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

export { useGetMe, useGetDetailUser, useGetAllUser, useUpdateAvatar, useUpdateUserInfo };
