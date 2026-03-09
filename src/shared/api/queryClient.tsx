import { QueryClient } from '@tanstack/react-query';

const MINUTE = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * MINUTE,
      gcTime: 30 * MINUTE,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});
