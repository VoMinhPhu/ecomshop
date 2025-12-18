'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';
import { useGetMe } from '@/hooks/users';
import { useLogout } from '@/hooks/auth';
import useUserStore from '@/stores/userStore';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KeyRound, LayoutDashboard, Loader, LogIn, LogOut, MapPin, Package, User } from 'lucide-react';

const UserMenuHeader = () => {
  const { mutate: logoutMutate } = useLogout();
  const { setUser, user, clearUser } = useUserStore();
  const { data, isError, dataUpdatedAt, isLoading } = useGetMe();

  useEffect(() => {
    if (data) setUser(data);
    if (isError) clearUser();
  }, [dataUpdatedAt, isError]);

  const handleLogout = () => logoutMutate();

  if (isLoading) {
    return (
      <div className="h-11 w-11 border rounded-full flex items-center justify-center">
        <Loader className="animate-spin text-white" size={18} />
      </div>
    );
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button className="h-12 cursor-pointer" variant="secondary">
          <LogIn /> Đăng nhập
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Image
            src={user.avatar ?? '/avatar.svg'}
            width={48}
            height={48}
            alt="avatar"
            className="rounded-full bg-white"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="py-1">
          <CardHeader className="flex gap-2 px-4">
            <Image
              src={user.avatar ?? '/avatar.svg'}
              width={40}
              height={40}
              alt={user.name ?? 'avatar'}
              className="rounded-full w-8.5 h-8.5 my-auto"
            />
            <div className="py-1">
              <p className="text-sm font-semibold bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent">
                {user.name}
              </p>
              <CardDescription className="text-xs max-w-40 truncate">{user.email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="py-1 md:pl-5">
            <Link
              href="/admin"
              className={cn(
                'flex items-center w-full py-1.5 hover:text-primary mt-0.5',
                user.role !== 'admin' && 'hidden',
              )}
            >
              <LayoutDashboard size={20} className="mr-2" strokeWidth={2} />
              Tới trang quản trị
            </Link>
            <Link href="/account" className="flex items-center w-full py-1.5 hover:text-primary mt-0.5">
              <User size={20} className="mr-2" strokeWidth={2} />
              Thông tin tài khoản
            </Link>
            <Link href="/account/cart" className="flex items-center w-full py-1.5 hover:text-primary mt-0.5">
              <Package size={20} className="mr-2" strokeWidth={2} />
              Giỏ hàng của bạn
            </Link>
            <Link href="/account" className="flex items-center w-full py-1.5 hover:text-primary mt-0.5">
              <KeyRound size={20} className="mr-2" strokeWidth={2} />
              Đổi mật khẩu
            </Link>
            <Link href="/account/address" className="flex items-center w-full py-1.5 hover:text-primary mt-0.5">
              <MapPin size={20} className="mr-2" strokeWidth={2} />
              Danh sách địa chỉ
            </Link>
          </CardContent>

          <div className="px-2 text-red-500 mt-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="lg"
              className="w-full hover:text-red-500 cursor-pointer"
            >
              <LogOut />
              Đăng xuất
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuHeader;
