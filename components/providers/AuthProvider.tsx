'use client';

import { useEffect } from 'react';
import { useGetTokenExpiration, useRefreshToken } from '@/hooks/token';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetTokenExpiration();
  const { mutate: refreshTokenMutate } = useRefreshToken();

  useEffect(() => {
    if (!data?.expiresAt) {
      if (data?.refreshToken) {
        refreshTokenMutate();
      }
      return;
    }

    const expireAt = new Date(data.expiresAt).getTime();
    const now = Date.now();
    const refreshBefore = expireAt - 90_000; // 1.5 minutes before expiry
    const delay = Math.max(refreshBefore - now, 0);

    const id = setTimeout(() => {
      refreshTokenMutate();
    }, delay);

    return () => clearTimeout(id);
  }, [data?.expiresAt]);

  return <>{children}</>;
};

export default AuthProvider;
