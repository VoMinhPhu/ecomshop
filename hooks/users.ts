import { getMeFn } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

const useGetMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMeFn,
    staleTime: 1000 * 60 * 10,
  });
};

export { useGetMe };
