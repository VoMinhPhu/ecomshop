import { logoutFn } from '@/lib/api/auth';
import useUserStore from '@/stores/userStore';
import { getTokenExpiration, refreshToken } from '@/lib/api/token';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useGetTokenExpiration = () => {
  return useQuery({
    queryKey: ['token'],
    queryFn: getTokenExpiration,
  });
};

const useRefreshToken = () => {
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['token'] });
    },
    onError: async () => {
      await logoutFn().finally(() => clearUser());
    },
  });
};

export { useGetTokenExpiration, useRefreshToken };
