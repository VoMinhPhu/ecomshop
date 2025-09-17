import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SubHeader from '@/components/common/header/SubHeader';
import SectionSearch from '@/components/common/header/SectionSearch';
import UserMenuHeader from './UserMenuHeader';

const Header = () => {
  return (
    <div className="fixed top-0 z-50 w-full bg-emerald-600 border-b flex flex-col items-center justify-center">
      <div className="max-w-300 px-2 w-full min-h-19 flex items-center">
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt="Logo" width={120} height={40} className="h-auto min-w-40 md:min-w-52" />
        </Link>
        <div className="hidden lg:block lg:mx-auto">
          <SectionSearch />
        </div>
        <div className="ml-auto flex items-center gap-1 md:gap-3">
          <UserMenuHeader />
          <Link href={'/account/cart'}>
            <Button
              variant={'outline'}
              className="bg-transparent cursor-pointer shadow-none hover:bg-white/80 h-12 py-0 text-white"
            >
              <span className="relative h-full flex items-center">
                <ShoppingCart className="size-6" />
                <span className="absolute top-0 left-3/4 w-5.5 h-5.5 text-xs text-white rounded-full bg-zinc-700 flex items-center justify-center">
                  0
                </span>
              </span>
              <span className="ml-1 text-base hidden md:block">Giỏ hàng</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full px-2 md:pb-2 lg:hidden">
        <SectionSearch />
      </div>

      <SubHeader />
    </div>
  );
};

export default Header;
