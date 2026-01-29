import { Suspense } from 'react';
import ResetPasswordClient from '@/components/auth/ResetPasswordClient';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordClient />
    </Suspense>
  );
}
