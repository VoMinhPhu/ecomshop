import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMeFn, updateAvatarFn, updateUserInfo } from '@/lib/api/users';
import { toast } from 'sonner';

const useGetMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMeFn,
    staleTime: 1000 * 60 * 10,
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

export { useGetMe, useUpdateAvatar, useUpdateUserInfo };
