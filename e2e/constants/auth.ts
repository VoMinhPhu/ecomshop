export const authFile = 'playwright/.auth/user.json';

export const authCookieName = 'refresh_token';
export const authCookieValue = 'e2e-refresh-token';

export const authCredentials = {
  email: 'user@gmail.com',
  password: 'user123@Abc',
} as const;

export const authText = {
  loginButton: 'Đăng nhập',
  welcomeTitle: 'Chào mừng bạn',
  accountLabel: 'Tài khoản',
  passwordPlaceholder: 'Nhập mật khẩu',
  invalidEmail: 'Vui lòng nhập địa chỉ email hợp lệ.',
  passwordRequired: 'Vui lòng nhập mật khẩu.',
} as const;
