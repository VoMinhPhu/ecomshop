'use client';

import dynamic from 'next/dynamic';

const VerifyPopup = dynamic(() => import('@/components/home/VerifyPopup'), {
  ssr: false,
});

export default function VerifyPopupLoader() {
  return <VerifyPopup />;
}
