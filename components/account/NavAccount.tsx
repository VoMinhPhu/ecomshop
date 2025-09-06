'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useLogout } from '@/hooks/auth';
import { LogOutIcon } from 'lucide-react';
import useUserStore from '@/stores/userStore';

const NavAccount = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | undefined>('account');

  const { mutate: logoutMutate } = useLogout();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const currpage = pathname.split('/').pop();
    setActive(currpage);
  }, [pathname]);

  return (
    <div className="border-r-2 my-2 hidden md:block">
      <div>
        <p className="text-xl font-medium">TÀI KHOẢN</p>
        <p className="text-sm">
          Xin chào
          <span className="font-semibold bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent ml-2">
            {user?.name ?? ''}
          </span>
        </p>
        <div className="my-4 ml-4">
          <Link
            href={'/account'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'account' ? 'text-primary font-medium' : '',
            )}
          >
            Thông tin tài khoản
          </Link>
          <Link
            href={'/account/cart'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'cart' ? 'text-primary font-medium' : '',
            )}
          >
            Đơn hàng của bạn
          </Link>
          <Link
            href={'/account'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'changePassword' ? 'text-primary font-medium' : '',
            )}
          >
            Đổi mật khẩu
          </Link>
          <Link
            href={'/account'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'address' ? 'text-primary font-medium' : '',
            )}
          >
            Danh sách địa chỉ
          </Link>
        </div>
        <div
          onClick={() => logoutMutate()}
          className="flex items-center gap-2 cursor-pointer text-red-500 mt-4 font-medium"
        >
          <LogOutIcon />
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default NavAccount;
