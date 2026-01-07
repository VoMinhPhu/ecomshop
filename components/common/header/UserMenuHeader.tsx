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
                'flex items-center w-full py-1.25 hover:text-primary text-[15px]',
                user.role !== 'admin' && 'hidden',
              )}
            >
              <LayoutDashboard size={20} className="mr-2" strokeWidth={2} />
              Tới trang quản trị
            </Link>
            <Link href="/account" className="flex items-center w-full py-1.25 hover:text-primary text-[15px]">
              <User size={20} className="mr-2" strokeWidth={2} />
              Thông tin tài khoản
            </Link>
            <Link href="/account/cart" className="flex items-center w-full py-1.25 hover:text-primary text-[15px]">
              <Package size={20} className="mr-2" strokeWidth={2} />
              Giỏ hàng của bạn
            </Link>
            <Link href="/account/order" className="flex items-center w-full py-1.25 hover:text-primary text-[15px]">
              <FileBox size={20} className="mr-2" strokeWidth={2} />
              Đơn hàng của bạn
            </Link>
            <Link href="/account" className="flex items-center w-full py-1.25 hover:text-primary text-[15px]">
              <KeyRound size={20} className="mr-2" strokeWidth={2} />
              Đổi mật khẩu
            </Link>
            <Link href="/account/address" className="flex items-center w-full py-1.25 hover:text-primary text-[15px]">
              <MapPin size={20} className="mr-2" strokeWidth={2} />
              Danh sách địa chỉ
            </Link>
          </CardContent>

          <div className="px-4 mt-2">
            <Button onClick={handleLogout} variant="outline" size="lg" className="w-full cursor-pointer">
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
