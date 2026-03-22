import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addAddress, deleteAddAddress, getAllAddress, setAddressDefault, updateAddress } from '@/lib/api/address';
import { toast } from 'sonner';

const useGetAllAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: getAllAddress,
    staleTime: 1000 * 60 * 20,
  });
};

const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success('Thêm địa chỉ mới', {
        description: 'Thêm địa chỉ mới thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
    onError: () => {
      toast.error('Thêm địa chỉ mới', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useSetAddressDefault = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setAddressDefault,
    onSuccess: () => {
      toast.success('Thêm địa chỉ mặc định', {
        description: 'Thêm địa chỉ mặc định thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
    onError: () => {
      toast.error('Thêm địa chỉ mặc định', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      toast.success('Cập nhật địa chỉ', {
        description: 'Cập nhật địa chỉ thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
    onError: () => {
      toast.error('Cập nhật địa chỉ', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useDeleteAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddAddress,
    onSuccess: () => {
      toast.success('Xóa địa chỉ', {
        description: 'Xóa địa chỉ thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
    onError: () => {
      toast.error('Xóa địa chỉ', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetAllAddress, useAddAddress, useDeleteAddAddress, useSetAddressDefault, useUpdateAddress };
