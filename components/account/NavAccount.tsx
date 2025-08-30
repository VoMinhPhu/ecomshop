'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { LogOutIcon } from 'lucide-react';

const NavAccount = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | undefined>('account');
  useEffect(() => {
    console.log(pathname);
    const currpage = pathname.split('/').pop();
    setActive(currpage);
  }, []);

  return (
    <div className="border-r-2 my-2">
      <div>
        <p className="text-xl font-medium">TÀI KHOẢN</p>
        <p className="text-sm">
          Xin chào
          <span className="font-semibold bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent ml-2">
            Võ Minh Phú
          </span>
        </p>
        <div className="my-4 ml-4">
          <Link
            onClick={() => setActive('account')}
            href={'/account'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'account' ? 'text-primary font-medium' : '',
            )}
          >
            Thông tin tài khoản
          </Link>
          <Link
            onClick={() => setActive('cart')}
            href={'/account/cart'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'cart' ? 'text-primary font-medium' : '',
            )}
          >
            Đơn hàng của bạn
          </Link>
          <Link
            onClick={() => setActive('changePassword')}
            href={'/account'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'changePassword' ? 'text-primary font-medium' : '',
            )}
          >
            Đổi mật khẩu
          </Link>
          <Link
            onClick={() => setActive('address')}
            href={'/account'}
            className={cn(
              'flex items-center w-full cursor-pointer py-2.5 hover:text-primary mt-0.5',
              active === 'address' ? 'text-primary font-medium' : '',
            )}
          >
            Danh sách địa chỉ
          </Link>
        </div>
        <div className="flex items-center gap-2 cursor-pointer text-red-500 mt-4 font-medium">
          <LogOutIcon />
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default NavAccount;
