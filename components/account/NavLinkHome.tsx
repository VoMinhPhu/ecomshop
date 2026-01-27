'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const BREADCRUMB_MAP: Record<string, { label: string; href: string }> = {
  account: { label: 'Tài khoản', href: '/account' },
  cart: { label: 'Giỏ hàng', href: '/account/cart' },
  order: { label: 'Đơn hàng', href: '/account/order' },
  address: { label: 'Quản lý địa chỉ', href: '/account/address' },
  'change-password': { label: 'Đổi mật khẩu', href: '/account/change-password' },
};

const NavLinkHome = () => {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="col-span-4 flex items-center gap-3 mt-2">
      <Link href="/" className="text-zinc-400">
        Trang chủ
      </Link>

      {segments.map((segment, index) => {
        const config = BREADCRUMB_MAP[segment];

        if (!config) return null;

        const isLast = index === segments.length - 1;

        return (
          <Link
            key={segment}
            href={config.href}
            className={cn('flex items-center gap-3 text-zinc-400', isLast && 'text-black')}
          >
            / {config.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinkHome;
