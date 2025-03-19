import { useQuery } from '@tanstack/react-query';
import { getUser } from '.';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};
