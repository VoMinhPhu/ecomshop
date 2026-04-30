import { RatingSummary, ReplyCommentResponse, Review } from '@/types/review';
import axiosInstance from '../axiosInstance';
import { AddCommentType, ReplyCommentType, UpdateCommentType } from '@/schemas/review';

const getRatingFn = async (productId: string): Promise<RatingSummary> => {
  const { data } = await axiosInstance.get(`/review/rating/${productId}`);

  return data;
};

const getReviewFn = async (productId: string): Promise<Review[]> => {
  const { data } = await axiosInstance.get(`/review/comment/${productId}`);

  return data;
};

const addCommentFn = async (payload: AddCommentType) => {
  const { data } = await axiosInstance.post('/review/comment', payload);

  return data;
};

const replyCommentFn = async (payload: ReplyCommentType): Promise<ReplyCommentResponse> => {
  const { data } = await axiosInstance.post('/review/reply', payload);

  return data;
};

const updateCommentFn = async (
  payload: UpdateCommentType,
): Promise<{ message: string; id: string; productId: string }> => {
  const { data } = await axiosInstance.patch(`/review/comment/${payload.id}`, payload);

  return data;
};

const deleteCommentFn = async (id: string): Promise<{ message: string; id: string; productId: string }> => {
  const { data } = await axiosInstance.delete(`/review/comment/${id}`);

  return data;
};

export { addCommentFn, replyCommentFn, getRatingFn, getReviewFn, updateCommentFn, deleteCommentFn };
