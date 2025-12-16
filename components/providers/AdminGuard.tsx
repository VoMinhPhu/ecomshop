'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userRole = useUserStore((s) => s.user?.role);

  useEffect(() => {
    if (!userRole || userRole !== 'admin') {
      router.replace('/');
    }
  }, [userRole, router]);

  if (!userRole) return null;

  return <>{children}</>;
}
