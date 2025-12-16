import { getProvinces, getWards } from '@/lib/api/map';
import { useQuery } from '@tanstack/react-query';

const useGetProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: getProvinces,
    staleTime: 1000 * 60 * 20,
  });
};

const useGetWards = (w: string) => {
  return useQuery({
    queryKey: ['ward', w],
    queryFn: () => getWards(Number(w)),
  });
};

export { useGetProvinces, useGetWards };
