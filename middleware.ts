import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value;

  if ((pathname.startsWith('/account') || pathname.startsWith('/admin')) && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/admin') && token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/is-admin`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*'],
};
