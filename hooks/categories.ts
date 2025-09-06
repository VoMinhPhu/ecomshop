import { useQuery } from '@tanstack/react-query';

import { getAllCategories } from '@/lib/api/categories';

const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 30,
  });
};

export { useGetAllCategories };
