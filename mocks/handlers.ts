import { http, HttpResponse } from 'msw';
import { AccountStatus, UserRole, type UserInfo } from '@/types/users.type';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';
const authCookieName = 'refresh_token';
const authCookieValue = 'e2e-refresh-token';

const mockUser: UserInfo = {
  id: 'e2e-user-id',
  email: 'user@gmail.com',
  avatar: '/avatar.svg',
  status: AccountStatus.ACTIVE,
  name: 'E2E User',
  phone: '0123456789',
  role: UserRole.USER,
  gender: null,
  dateOfBirth: null,
  isVerified: true,
  hasPassword: true,
};

const isAuthenticated = (request: Request) =>
  request.headers.get('cookie')?.includes(`${authCookieName}=${authCookieValue}`) ?? false;

const buildAuthCookie = () => `${authCookieName}=${authCookieValue}; Path=/; SameSite=Lax`;
const clearAuthCookie = () => `${authCookieName}=; Path=/; Max-Age=0; SameSite=Lax`;

export const handlers = [
  http.post(`${apiUrl}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (body.email === mockUser.email && body.password === 'user123@Abc') {
      return HttpResponse.json(
        { message: 'Login successful' },
        {
          headers: {
            'Set-Cookie': buildAuthCookie(),
          },
        },
      );
    }

    return HttpResponse.json(
      { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
      {
        status: 401,
      },
    );
  }),

  http.get(`${apiUrl}/users/me`, ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(mockUser);
  }),

  http.post(`${apiUrl}/auth/refresh`, ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(
      { message: 'Refresh successful' },
      {
        headers: {
          'Set-Cookie': buildAuthCookie(),
        },
      },
    );
  }),

  http.post(`${apiUrl}/auth/logout`, () =>
    HttpResponse.json(
      { message: 'Logout successful' },
      {
        headers: {
          'Set-Cookie': clearAuthCookie(),
        },
      },
    ),
  ),

  http.get(`${apiUrl}/auth/is-admin`, ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json({ isAdmin: false });
  }),
];
