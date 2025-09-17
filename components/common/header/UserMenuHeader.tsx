'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

import { useGetMe } from '@/hooks/users';
import { useLogout } from '@/hooks/auth';
import useUserStore from '@/stores/userStore';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KeyRound, LogIn, LogOut, MapPin, Package, User } from 'lucide-react';

const UserMenuHeader = () => {
  const { data, isError } = useGetMe();
  const { mutate: logoutMutate } = useLogout();
  const { setUser, user, clearUser } = useUserStore();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (isError) clearUser();
  }, [data, isError]);
  const handleLogout = () => logoutMutate();

  return (
    <div className="relative">
      {!user ? (
        <Link href={'/account/login'}>
          <Button className="h-12 cursor-pointer" variant={'secondary'}>
            <LogIn /> Đăng nhập
          </Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Image src={user?.avatar ?? '/avatar.svg'} width={48} height={48} alt="avatar" className="rounded-full" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <div className="py-1">
              <CardHeader className="flex gap-2 px-4">
                <Image
                  src={user?.avatar ?? '/avatar.svg'}
                  width={40}
                  height={40}
                  alt={user?.name ?? 'avatar'}
                  className="rounded-full w-8.5 h-8.5 my-auto"
                />
                <div className="py-1">
                  <p className="text-sm font-semibold bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent">
                    {user?.name ?? ''}
                  </p>
                  <CardDescription className="text-xs max-w-40 truncate">{user?.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="py-1 md:pl-5">
                <Link
                  href={'/account'}
                  className="flex items-center w-full py-1.5 lg:py-1.25 hover:text-primary mt-0.5"
                >
                  <User size={20} className="mr-2" strokeWidth={2} />
                  Thông tin tài khoản
                </Link>
                <Link
                  href={'/account/cart'}
                  className="flex items-center w-full py-1.5 lg:py-1.25 hover:text-primary mt-0.5"
                >
                  <Package size={20} className="mr-2" strokeWidth={2} />
                  Đơn hàng của bạn
                </Link>
                <Link
                  href={'/account'}
                  className="flex items-center w-full py-1.5 lg:py-1.25 hover:text-primary mt-0.5"
                >
                  <KeyRound size={20} className="mr-2" strokeWidth={2} />
                  Đổi mật khẩu
                </Link>
                <Link
                  href={'/account'}
                  className="flex items-center w-full py-1.5 lg:py-1.25 hover:text-primary mt-0.5"
                >
                  <MapPin size={20} className="mr-2" strokeWidth={2} />
                  Danh sách địa chỉ
                </Link>
              </CardContent>
              <div className="px-2 text-red-500 mt-3">
                <Button
                  onClick={handleLogout}
                  variant={'outline'}
                  size={'lg'}
                  className="w-full hover:text-red-500 cursor-pointer"
                >
                  <LogOut />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserMenuHeader;
