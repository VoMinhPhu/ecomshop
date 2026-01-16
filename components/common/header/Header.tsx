import Link from 'next/link';
import Image from 'next/image';

import CartSection from './CartSection';
import UserMenuHeader from './UserMenuHeader';
import SubHeader from '@/components/common/header/SubHeader';
import SectionSearch from '@/components/common/header/SectionSearch';

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-emerald-500 border-b flex flex-col items-center justify-center">
      <div className="max-w-300 px-2 w-full min-h-19 flex items-center">
        <Link href={'/'}>
          <Image
            width={120}
            height={40}
            alt="Ecomshop - của hàng trực tuyến"
            src={'/icons/logo.svg'}
            className="h-auto min-w-40 md:min-w-52"
          />
        </Link>
        <div aria-label="Tìm kiếm sản phẩm" className="hidden lg:block lg:mx-auto">
          <SectionSearch />
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <CartSection />
          <div aria-label="User menu">
            <UserMenuHeader />
          </div>
        </div>
      </div>
      <div aria-label="Tìm kiếm sản phẩm" className="w-full px-2 md:pb-2 lg:hidden">
        <SectionSearch />
      </div>
      <nav aria-label="Sub navigation" className="w-full">
        <SubHeader />
      </nav>
    </header>
  );
};

export default Header;
