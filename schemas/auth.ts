import z from 'zod';

export const formLoginSchema = z.object({
  email: z.email('Vui lòng nhập địa chỉ email hợp lệ.'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu.').max(50),
});

export const formRegiterSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập họ và tên.').max(50),
    email: z.email('Vui lòng nhập địa chỉ email hợp lệ.'),
    password: z
      .string()
      .min(6, 'Mật khẩu ít nhất phải 6 kí tự.')
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
        'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp.',
    path: ['confirmPassword'],
  });

export const formChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Vui lòng nhập mật khẩu.').max(50),
    newPassword: z
      .string()
      .min(6, 'Mật khẩu ít nhất phải 6 kí tự.')
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
        'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp.',
    path: ['confirmPassword'],
  });

export const formSetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Mật khẩu ít nhất phải 6 kí tự.')
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
        'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp.',
    path: ['confirmPassword'],
  });

export type FormLoginType = z.infer<typeof formLoginSchema>;
export type FormRegisterType = z.infer<typeof formRegiterSchema>;
export type FormSetPasswordType = z.infer<typeof formSetPasswordSchema>;
export type FormChangePasswordType = z.infer<typeof formChangePasswordSchema>;
