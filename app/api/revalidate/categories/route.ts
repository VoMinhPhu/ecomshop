import { revalidateTag } from 'next/cache';

export async function POST() {
  try {
    revalidateTag('categories');
    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to revalidate' }), { status: 500 });
  }
}
