'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';

const banners = ['/banner/banner1.webp', '/banner/banner2.webp', '/banner/banner3.webp', '/banner/banner4.webp'];

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="bg-white rounded-md p-3 md:p-4">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          dragFree: true,
          align: 'start',
        }}
        className="w-full max-w-300 mx-auto group"
      >
        <CarouselContent>
          {banners.map((item, i) => (
            <CarouselItem key={i} className="pl-4 lg:basis-1/2">
              <Image src={item} width={468} height={263} alt={item} className="h-auto rounded-md w-full lg:w-117" />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="text-primary hidden group-hover:flex hover:text-primary left-2" />
        <CarouselNext className="text-primary hidden group-hover:flex hover:text-primary right-2" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <Button
            key={i}
            className={cn(
              `h-0.75 w-6 p-0 rounded-full transition-colors bg-gray-300 cursor-pointer`,
              i === selectedIndex && 'bg-primary',
            )}
            onClick={() => api?.scrollTo(i)}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
