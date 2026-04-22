'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, SidebarIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInput, useSidebar } from '@/components/ui/sidebar';

const pages: Record<string, string> = {
  admin: 'Tổng quan',
  products: 'Sản phẩm',
  create: 'Tạo mới sản phẩm',
  details: 'Chi tiết sản phẩm',
  users: 'Người dùng',
  categories: 'Danh mục',
  orders: 'Đơn hàng',
  brands: 'Thương hiệu',
  customers: 'Khách hàng',
  chats: 'Tin nhắn',
};

const HeaderAdmin = () => {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Trang quản trị</BreadcrumbLink>
            </BreadcrumbItem>
            {segments.slice(1).map((seg, idx) => {
              const href = '/admin/' + segments.slice(1, idx + 2).join('/');
              const label = pages[seg] ?? seg;

              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {idx === segments.slice(1).length - 1 ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full sm:ml-auto sm:w-auto">
          <div className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput id="search" placeholder="Tìm kiếm ..." className="h-8 pl-7" />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
