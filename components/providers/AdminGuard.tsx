'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCheckIsAdmin } from '@/hooks/api/auth.hook';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data, isLoading, isError } = useCheckIsAdmin();

  useEffect(() => {
    if (isError) router.push('/');
  }, [data, isLoading, isError]);

  if (isLoading) return null;
  if (isError) return;

  return <>{children}</>;
}
