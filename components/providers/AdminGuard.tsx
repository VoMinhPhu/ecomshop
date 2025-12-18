'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useGetMe } from '@/hooks/users';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data, isLoading } = useGetMe();

  useEffect(() => {
    if (!data) return;

    if (data.role !== 'admin') {
      router.replace('/');
    }
  }, [data]);

  if (isLoading) return null;

  return <>{children}</>;
}
