'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MswProvider from './MswProvider';

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MswProvider>{children}</MswProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
