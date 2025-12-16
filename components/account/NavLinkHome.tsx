'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const NavLinkHome = () => {
  const pathname = usePathname();

  const links = pathname.split('/');

  return (
    <div className="col-span-4 flex items-center gap-3 mt-2">
      <Link href={'/'} className="text-zinc-400">
        Trang chủ
      </Link>
      {links.map((l, i) => {
        if (i === 0) return;
        let link;
        if (l === 'account') {
          l = 'Tài khoản';
          link = '/account';
        }
        if (l === 'cart') {
          link = '/account/cart';
          l = 'Giỏ hàng';
        }
        if (l === 'address') {
          link = '/account/address';
          l = 'Quản lý địa chỉ';
        }
        return (
          <Link
            href={link || '#'}
            key={i}
            className={cn(
              'flex items-center gap-3 text-zinc-400',

              i === links.length - 1 && 'text-black',
            )}
          >
            / {l}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinkHome;
