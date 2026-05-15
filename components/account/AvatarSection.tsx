'use client';

import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const CropAvatar = dynamic(() => import('@/components/account/CropAvatar'), {
  ssr: false,
});

type Props = {
  userAvatar?: string | null;
};

const AvatarSection = ({ userAvatar }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center md:col-span-2 order-1 lg:pt-6 pt-4 md:pt-0">
      <Image
        src={userAvatar ?? '/avatar.svg'}
        width={160}
        height={160}
        alt="avt"
        className={cn('rounded-full border', imageSrc && 'hidden')}
      />
      <CropAvatar setImageSrc={setImageSrc} imageSrc={imageSrc} />
    </div>
  );
};

export default AvatarSection;
