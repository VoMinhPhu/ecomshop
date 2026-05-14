import { describe, expect, it } from 'vitest';

import { formLoginSchema, formRegiterSchema, formChangePasswordSchema } from '@/schemas/auth.schema';

describe('auth schemas', () => {
  it('accepts valid login data', () => {
    const result = formLoginSchema.safeParse({
      email: 'user@example.com',
      password: 'password',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid login email and empty password', () => {
    const result = formLoginSchema.safeParse({
      email: 'invalid-email',
      password: '',
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.email).toContain('Vui lòng nhập địa chỉ email hợp lệ.');
    expect(result.error?.flatten().fieldErrors.password).toContain('Vui lòng nhập mật khẩu.');
  });

  it('requires a strong register password', () => {
    const result = formRegiterSchema.safeParse({
      name: 'Nguyen Van A',
      email: 'user@example.com',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.password).toContain(
      'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
    );
  });

  it('rejects mismatched change password confirmation', () => {
    const result = formChangePasswordSchema.safeParse({
      oldPassword: 'Old123@',
      newPassword: 'New123@',
      confirmPassword: 'Different123@',
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.confirmPassword).toContain('Mật khẩu không khớp.');
  });
});
