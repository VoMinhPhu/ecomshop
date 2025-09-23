import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || null;
  const refreshToken = cookieStore.get('refresh_token')?.value || null;

  const { exp } = decodeJwt(token);
  const expiresAt = new Date(exp * 1000);

  return Response.json({ refreshToken: !!refreshToken, expiresAt });
}

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: res.headers,
  });
}

function decodeJwt(token: string | null) {
  if (!token) return {};
  const payload = token.split('.')[1];
  return JSON.parse(Buffer.from(payload, 'base64').toString());
}
