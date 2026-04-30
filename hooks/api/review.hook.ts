import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  addCommentFn,
  deleteCommentFn,
  getRatingFn,
  getReviewFn,
  replyCommentFn,
  updateCommentFn,
} from '@/lib/api/review';

const useGetRating = (productId: string) => {
  return useQuery({
    queryKey: ['rating', productId],
    queryFn: () => getRatingFn(productId),
    staleTime: 1000 * 60 * 10,
  });
};

const useGetReview = (productId: string) => {
  return useQuery({
    queryKey: ['comment', productId],
    queryFn: () => getReviewFn(productId),
    staleTime: 1000 * 60 * 10,
  });
};

const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCommentFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comment', data.productId] });
      queryClient.invalidateQueries({ queryKey: ['rating', data.productId] });

      toast.success('Đánh giá sản phẩm', {
        description: 'Đánh giá sản phẩm thành công.',
        duration: 2000,
      });
    },
    onError: () => {
      toast.error('Đánh giá sản phẩm', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useReplyComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: replyCommentFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comment', data.productId] });
    },
    onError: () => {
      toast.error('Phản hồi đánh giá', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
      });
    },
  });
};

const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommentFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comment', data.productId] });
      queryClient.invalidateQueries({ queryKey: ['rating', data.productId] });

      toast.success('Chỉnh sửa đánh giá', {
        description: 'Chỉnh sửa đánh giá thành công',
        duration: 1500,
      });
    },
    onError: () => {
      toast.error('Chỉnh sửa đánh giá', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
      });
    },
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comment', data.productId] });
      queryClient.invalidateQueries({ queryKey: ['rating', data.productId] });

      toast.success('Xóa đánh giá', {
        description: 'Xóa đánh giá thành công',
        duration: 1500,
      });
    },
    onError: () => {
      toast.error('Xóa đánh giá', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
      });
    },
  });
};

export { useGetRating, useGetReview, useAddComment, useReplyComment, useEditComment, useDeleteComment };
