'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type SortType = 'priceAsc' | 'priceDesc' | 'newest' | undefined;

export const useProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brands, setBrands] = useState<string[]>(searchParams.getAll('brand'));
  const [categories, setCategories] = useState<string[]>(searchParams.getAll('category'));

  const sortParam = searchParams.get('sort');
  const [sort, setSort] = useState<SortType>(
    sortParam === 'priceAsc' || sortParam === 'priceDesc' || sortParam === 'newest' ? sortParam : undefined,
  );

  const [minInput, setMinInput] = useState<number | undefined>(
    searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
  );
  const [maxInput, setMaxInput] = useState<number | undefined>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  );

  const [minApplied, setMinApplied] = useState(minInput);
  const [maxApplied, setMaxApplied] = useState(maxInput);

  const pageParam = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const [page, setPage] = useState<number>(pageParam);

  useEffect(() => {
    const params = new URLSearchParams();

    brands.forEach((b) => params.append('brand', b));
    categories.forEach((c) => params.append('category', c));
    if (sort) params.set('sort', sort);
    if (minApplied !== undefined) params.set('minPrice', String(minApplied));
    if (maxApplied !== undefined) params.set('maxPrice', String(maxApplied));

    if (page && page > 1) params.set('page', String(page));

    router.push(`/products?${params.toString()}`);
  }, [brands, categories, sort, minApplied, maxApplied, page, router]);

  const resetPage = () => setPage(1);

  return {
    sort,
    page,
    brands,
    minInput,
    maxInput,
    categories,
    minApplied,
    maxApplied,
    setPage,
    setSort: (v: SortType) => {
      setSort(v);
      resetPage();
    },
    setBrands: (v: string[]) => {
      setBrands(v);
      resetPage();
    },
    setCategories: (v: string[]) => {
      setCategories(v);
      resetPage();
    },
    setMinInput,
    setMaxInput,
    applyPrice: () => {
      if (minInput != null && minInput < 0) return;
      if (maxInput != null && maxInput <= 0) return;
      setMinApplied(minInput);
      setMaxApplied(maxInput);
      resetPage();
    },
    clearPrice: () => {
      setMinInput(undefined);
      setMaxInput(undefined);
      setMinApplied(undefined);
      setMaxApplied(undefined);
      resetPage();
    },
  };
};
