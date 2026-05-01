import axiosInstance from '@/lib/axiosInstance';

import { SearchProductResponse, GetDynamicProductInsoBySlugResponse } from '@/types/products.type';

const getDynamicProductInsoByIdFn = async (slug: string): Promise<GetDynamicProductInsoBySlugResponse> => {
  const res = await axiosInstance.get(`/product/dynamic/${slug}`);

  return res.data;
};

const searchProductFn = async (query: string): Promise<SearchProductResponse> => {
  const res = await axiosInstance.get('/product/search', { params: { q: query } });

  return res.data;
};

export { getDynamicProductInsoByIdFn, searchProductFn };
