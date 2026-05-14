'use client';

import { useEffect, useState } from 'react';

let workerStartPromise: Promise<void> | null = null;

const shouldEnableMsw = process.env.NEXT_PUBLIC_ENABLE_MSW === 'true';

export default function MswProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!shouldEnableMsw);

  useEffect(() => {
    if (!shouldEnableMsw) return;

    if (!workerStartPromise) {
      workerStartPromise = import('../../mocks/browser')
        .then(({ worker }) =>
          worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          }),
        )
        .then(() => undefined);
    }

    workerStartPromise
      .then(() => setIsReady(true))
      .catch((error) => {
        console.error('Failed to start MSW', error);
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
