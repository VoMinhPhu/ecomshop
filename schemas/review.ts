import { z } from 'zod';

export const addCommentSchema = z.object({
  productId: z.string().min(1, 'ID là bắt buộc'),
  comment: z.string().trim().min(1, 'Đánh giá sản phẩm'),
  rating: z
    .string()
    .trim()
    .min(1, 'Số lượng sản phẩm hiện có')
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, 'Số sao không hợp lệ'),
});

export const replyCommentSchema = z.object({
  commentId: z.string().min(1, 'ID là bắt buộc'),
  comment: z.string().trim().min(1, 'Phản hồi đánh giá'),
});

export const updateCommentSchema = z.object({
  id: z.string().min(1, 'ID là bắt buộc'),
  comment: z.string().trim().min(1, 'Đánh giá sản phẩm'),
  rating: z
    .string()
    .trim()
    .min(1, 'Số lượng sản phẩm hiện có')
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, 'Số sao không hợp lệ'),
});

export type AddCommentType = z.infer<typeof addCommentSchema>;
export type ReplyCommentType = z.infer<typeof replyCommentSchema>;
export type UpdateCommentType = z.infer<typeof updateCommentSchema>;
