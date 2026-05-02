import z from 'zod';

export const updateUserInfoSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống').optional(),
  gender: z.enum(['male', 'female']).optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^0\d{9}$/.test(val), {
      message: 'Số điện thoại không hợp lệ',
    }),
  dateOfBirth: z
    .date()
    .optional()
    .refine((val) => !val || (new Date(val) >= new Date('1900-01-01') && new Date(val) <= new Date()), {
      message: 'Ngày sinh phải nằm trong khoảng từ năm 1900 đến nay',
    }),
});

export const updateAccountStatusSchema = z.object({
  id: z.string().min(1, 'ID là bắt buộc'),
  status: z.enum(['active', 'unactive', 'banned']),
});

export type UpdateUserInfoType = z.infer<typeof updateUserInfoSchema>;
export type UpdateAccountStatus = z.infer<typeof updateAccountStatusSchema>;
