'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const SubHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn('w-full h-12 bg-zinc-700 hidden md:flex items-center justify-center', scrolled ? 'md:hidden' : '')}
    >
      <div className="max-w-300 px-2 w-full md:mx-4 lg:mx-0 text-white">
        <Link href={'#'} className="md:mr-6 lg:mr-8 hover:text-primary">
          THANH TOÁN
        </Link>
        <Link href={'#'} className="md:mr-6 lg:mr-8 hover:text-primary">
          TRẢ GÓP
        </Link>
        <Link href={'#'} className="md:mr-6 lg:mr-8 hover:text-primary">
          LIÊN HỆ
        </Link>
        <Link href={'#'} className="md:mr-6 lg:mr-8 hover:text-primary">
          CHĂM SÓC KHÁCH HÀNG
        </Link>
        <Link href={'#'} className="md:mr-6 lg:mr-8 hover:text-primary">
          THƯ VIỆN
        </Link>
        <Link href={'#'} className="md:mr-6 lg:mr-8 hover:text-primary">
          TUYỂN DỤNG
        </Link>
      </div>
    </div>
  );
};

export default SubHeader;
