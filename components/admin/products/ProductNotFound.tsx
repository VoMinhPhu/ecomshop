import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-start h-full gap-2">
      <div className="flex justify-start w-full px-4 pt-4">
        <Link href={'/admin'}>
          <Button variant="outline" size={'lg'}>
            <HomeIcon className="w-4 h-4" />
            Quay lại trang thống kê
          </Button>
        </Link>
      </div>
      <div className="relative pt-4 md:pt-20 lg:pt-4">
        <Image
          src="/icons/not-found.svg"
          width={400}
          height={400}
          className="h-auto w-75 md:w-80 lg:w-100"
          alt="Not Found Icon"
        />
        <Image
          src="/icons/not-found-icon.svg"
          width={230}
          height={230}
          className="h-auto absolute top-1/2 left-1/2 -translate-x-1/2 md:w-50 lg:w-57.5"
          alt="Not Found"
        />
      </div>
      <p className="font-bold md:text-xl mt-25 md:mt-15 md:pt-4 lg:mt-0 lg:text-4xl text-center mb-10 lg:mb-5">
        Không tìm thấy thông tin sản phẩm
      </p>
      <Link href={'/admin'}>
        <Button variant="outline" size={'lg'}>
          Quay lại trang thống kê
        </Button>
      </Link>
    </div>
  );
}
