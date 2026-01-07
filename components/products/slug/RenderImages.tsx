'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  images: {
    id: string;
    url: string;
  }[];
  name: string;
};

export default function RenderImages({ images, name }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<string>(images[0].url);

  const scrollLeft = () => {
    ref.current?.scrollBy({ left: -180, behavior: 'smooth' });
  };

  const scrollRight = () => {
    ref.current?.scrollBy({ left: 180, behavior: 'smooth' });
  };
  return (
    <div>
      <div className="h-112.5 flex items-center">
        <Image
          src={view}
          priority={true}
          alt={name}
          width={450}
          height={450}
          className="p-2 w-full h-full object-contain"
        />
      </div>
      <div className="relative flex items-center group">
        <button
          onClick={scrollLeft}
          className="absolute bg-slate-100/70 px-1 cursor-pointer h-3/4 hidden group-hover:block left-0 z-10"
        >
          <ChevronLeftIcon />
        </button>
        <div
          ref={ref}
          className="flex items-center px-3 py-1 max-h-32 gap-2 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {images.map((image) => {
            const isActive = view === image.url;
            return (
              <button
                key={image.id}
                onClick={() => setView(image.url)}
                className={cn(
                  'h-30 min-w-30 flex items-center justify-center',
                  isActive && 'border-2 border-primary rounded-md',
                )}
              >
                <Image
                  src={image.url}
                  width={100}
                  height={100}
                  alt="Ảnh chi tiết sản phẩm"
                  className="h-auto max-h-30 max-w-100 object-contain p-0.5"
                />
              </button>
            );
          })}
        </div>
        <button
          onClick={scrollRight}
          className="absolute bg-slate-100/70 px-1 cursor-pointer h-3/4 hidden group-hover:block right-0 z-10"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
