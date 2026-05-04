'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, LayersIcon, Package2Icon, ShoppingCartIcon, UserIcon } from 'lucide-react';

import useUserStore from '@/stores/user.store';
import { Category } from '@/types/categories.type';
import { useBottomNavVisible } from '@/hooks/ui/useBottomNavVisible';

import AuthPopup from '@/components/auth/AuthPopup';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import CategoriesOnMobile from './CategoriesOnMobile';

type Props = {
  categories?: Category[];
};

export default function NavBottomOnMobile({ categories = [] }: Props) {
  const [openAuth, setOpenAuth] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const visible = useBottomNavVisible();

  const user = useUserStore((s) => s.user);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <nav
        className={`md:hidden fixed bottom-0 w-full z-[60] border-t-2 border-primary bg-white h-14 flex transition-transform duration-[600ms] ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Link href="/" className="flex-1 flex flex-col items-center justify-center">
          <HomeIcon className="size-6 text-primary" />
          <span className="text-xs text-gray-500">Trang chủ</span>
        </Link>

        <Sheet open={openCategories} onOpenChange={setOpenCategories}>
          <SheetTrigger asChild>
            <button className="flex-1 flex flex-col items-center justify-center">
              <LayersIcon className="size-6 text-primary" />
              <span className="text-xs text-gray-500">Danh mục</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col gap-0">
            <SheetHeader className="p-4 border-b border-gray-100 shadow-sm sticky top-0 bg-white z-10">
              <SheetTitle className="text-left text-lg">Danh mục sản phẩm</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 pt-0 pb-16">
              <CategoriesOnMobile categories={categories} onClose={() => setOpenCategories(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/products" className="flex-1 flex flex-col items-center justify-center">
          <Package2Icon className="size-6 text-primary" />
          <span className="text-xs text-gray-500">Sản phẩm</span>
        </Link>

        {user ? (
          <>
            <Link href="/account/cart" className="flex-1 flex flex-col items-center justify-center">
              <ShoppingCartIcon className="size-6 text-primary" />
              <span className="text-xs text-gray-500">Giỏ hàng</span>
            </Link>

            <Link href="/account" className="flex-1 flex flex-col items-center justify-center">
              <UserIcon className="size-6 text-primary" />
              <span className="text-xs text-gray-500">Tài khoản</span>
            </Link>
          </>
        ) : (
          <button onClick={() => setOpenAuth(true)} className="flex-1 flex flex-col items-center justify-center">
            <UserIcon className="size-6 text-primary" />
            <span className="text-xs text-gray-500">Đăng nhập</span>
          </button>
        )}
      </nav>

      <AuthPopup open={openAuth} onOpenChange={setOpenAuth} />
    </>
  );
}
