'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import CropAvatar from '@/components/account/CropAvatar';

type Props = {
  userAvatar?: string | null;
};

const AvatarSection = ({ userAvatar }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center md:col-span-2 order-1 lg:pt-6 pt-4 md:pt-0">
      <Image
        priority
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
