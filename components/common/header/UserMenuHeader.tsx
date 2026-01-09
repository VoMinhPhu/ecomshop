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
import { FileBox, KeyRound, LayoutDashboard, Loader, LogOut, MapPin, Package, User } from 'lucide-react';

import AuthPopup from '@/components/auth/AuthPopup';

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
    return <AuthPopup />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Image
            src={user.avatar ?? '/avatar.svg'}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full bg-white border border-zinc-400"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="py-1">
          <CardHeader className="flex gap-2 px-2">
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
              <CardDescription className="text-xs max-w-30 truncate">{user.email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="py-1 md:pl-3">
            <Link
              href="/admin"
              className={cn(
                'flex items-center w-full py-1 hover:text-primary text-[15px]',
                user.role !== 'admin' && 'hidden',
              )}
            >
              <LayoutDashboard size={18} className="mr-2" strokeWidth={1.75} />
              Tới trang quản trị
            </Link>
            <Link href="/account" className="flex items-center w-full py-1 hover:text-primary text-[15px]">
              <User size={18} className="mr-2" strokeWidth={1.75} />
              Thông tin tài khoản
            </Link>
            <Link href="/account/cart" className="flex items-center w-full py-1 hover:text-primary text-[15px]">
              <Package size={18} className="mr-2" strokeWidth={1.75} />
              Giỏ hàng của bạn
            </Link>
            <Link href="/account/order" className="flex items-center w-full py-1 hover:text-primary text-[15px]">
              <FileBox size={18} className="mr-2" strokeWidth={1.75} />
              Đơn hàng của bạn
            </Link>
            <Link href="/account" className="flex items-center w-full py-1 hover:text-primary text-[15px]">
              <KeyRound size={18} className="mr-2" strokeWidth={1.75} />
              Đổi mật khẩu
            </Link>
            <Link href="/account/address" className="flex items-center w-full py-1 hover:text-primary text-[15px]">
              <MapPin size={18} className="mr-2" strokeWidth={1.75} />
              Danh sách địa chỉ
            </Link>
          </CardContent>

          <div className="px-2 mt-2 pb-3">
            <Button onClick={handleLogout} variant="outline" className="w-full">
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
