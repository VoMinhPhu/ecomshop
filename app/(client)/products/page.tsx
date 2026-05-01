import { Suspense } from 'react';
import { type SearchParams } from 'next/dist/server/request/search-params';

import { fetchNameAndSlugOfCategoriesAndBrands } from '@/lib/server/product.server';

import FilterProductPage from '@/components/products/FilterProductPage';
import ListProductLoading from '@/components/products/ListProductLoading';
import ListProductsWrapper from '@/components/products/ListProductsWrapper';
import FilterProductLoading from '@/components/products/FilterProductLoading';

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 30);
  const brand = [params.brand ?? []].flat() as string[];
  const category = [params.category ?? []].flat() as string[];
  const search = (params.search as string) ?? undefined;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const sortParam = params.sort as string | undefined;
  const SORT_VALUES = ['priceAsc', 'priceDesc', 'newest'] as const;
  type SortValue = (typeof SORT_VALUES)[number];

  const sort = SORT_VALUES.includes(sortParam as SortValue) ? (sortParam as SortValue) : undefined;

  const filterParams = { page, limit, brand, category, search, minPrice, maxPrice, sort };

  //manage loading list product when filter change
  const listKey = JSON.stringify(params);

  const filterData = await fetchNameAndSlugOfCategoriesAndBrands();

  return (
    <div className="lg:max-w-300 mx-auto">
      <Suspense fallback={<FilterProductLoading />}>
        <FilterProductPage data={filterData} />
      </Suspense>

      <Suspense key={listKey} fallback={<ListProductLoading />}>
        <ListProductsWrapper params={filterParams} />
      </Suspense>
    </div>
  );
};

export default Page;
