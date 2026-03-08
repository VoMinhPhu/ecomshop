'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useCustomersTableParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 20);
  const email = searchParams.get('email') ?? undefined;

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  useEffect(() => {
    setPagination((p) => {
      const next = { pageIndex: page - 1, pageSize: limit };

      if (p.pageIndex === next.pageIndex && p.pageSize === next.pageSize) {
        return p;
      }

      return next;
    });
  }, [page, limit]);

  const syncUrl = (params: { page: number; limit: number; email?: string }) => {
    const sp = new URLSearchParams();

    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') {
        sp.set(k, String(v));
      }
    });

    router.replace(`?${sp.toString()}`);
  };

  return {
    pagination,
    emailParam: email,

    syncUrl,
    setPagination,
  };
}
