'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { FileBox, KeyRound, MapPin, Package, User } from 'lucide-react';

const NavAccount = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | undefined>('account');

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const currpage = pathname.split('/').pop();
    setActive(currpage);
  }, [pathname]);

  return (
    <Card className="border-r-2 mt-4 py-3 gap-0">
      <CardHeader className="flex gap-2 px-4">
        <Image
          src={user?.avatar ?? '/avatar.svg'}
          width={48}
          height={48}
          alt={user?.name ?? 'avatar'}
          className="rounded-full w-12 h-12 my-auto"
        />
        <div className="py-1">
          <p className="text-sm font-semibold bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent">
            {user?.name ?? ''}
          </p>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </CardHeader>
      <Separator className="mt-3" />
      <CardContent className="py-1 md:pl-5">
        <Link
          href={'/account'}
          className={cn(
            'flex items-center w-full cursor-pointer py-1.5 lg:py-1.25 hover:text-primary mt-0.5',
            active === 'account' ? 'text-primary font-medium' : '',
          )}
        >
          <User size={20} className="mr-2" strokeWidth={2} />
          Thông tin tài khoản
        </Link>
        <Link
          href={'/account/cart'}
          className={cn(
            'flex items-center w-full cursor-pointer py-1.5 lg:py-1.25 hover:text-primary mt-0.5',
            active === 'cart' ? 'text-primary font-medium' : '',
          )}
        >
          <Package size={20} className="mr-2" strokeWidth={2} />
          Giỏ hàng của bạn
        </Link>
        <Link
          href={'/account/order'}
          className={cn(
            'flex items-center w-full cursor-pointer py-1.5 lg:py-1.25 hover:text-primary mt-0.5',
            active === 'order' ? 'text-primary font-medium' : '',
          )}
        >
          <FileBox size={20} className="mr-2" strokeWidth={2} />
          Đơn hàng của bạn
        </Link>
        <Link
          href={'/account/change-password'}
          className={cn(
            'flex items-center w-full cursor-pointer py-1.5 lg:py-1.25 hover:text-primary mt-0.5',
            active === 'change-password' ? 'text-primary font-medium' : '',
          )}
        >
          <KeyRound size={20} className="mr-2" strokeWidth={2} />
          Đổi mật khẩu
        </Link>
        <Link
          href={'/account/address'}
          className={cn(
            'flex items-center w-full cursor-pointer py-1.5 lg:py-1.25 hover:text-primary mt-0.5',
            active === 'address' ? 'text-primary font-medium' : '',
          )}
        >
          <MapPin size={20} className="mr-2" strokeWidth={2} />
          Danh sách địa chỉ
        </Link>
      </CardContent>
    </Card>
  );
};

export default NavAccount;
