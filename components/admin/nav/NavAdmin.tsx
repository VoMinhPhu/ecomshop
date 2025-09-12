'use client';

import Link from 'next/link';
import Image from 'next/image';

import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import UserMenuAdmin from '@/components/admin/nav/UserMenuAdmin';
import { Blocks, Box, Layers, Receipt, Ticket, Users } from 'lucide-react';

export default function NavAdmin() {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={'/logo-small.svg'} width={32} height={32} alt="Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">eComStore</span>
                  <span className="truncate text-xs">Trao đổi và mua bán</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="/admin">
                  <Blocks />
                  <span>Thống kê</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quản lý sản phẩm</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="#">
                  <Box />
                  <span>Sản phẩm</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="#">
                  <Layers />
                  <span>Danh mục</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="#">
                  <Ticket />
                  <span>Khuyến mãi</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Bán hàng</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="#">
                  <Receipt />
                  <span>Đơn hàng</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="#">
                  <Users />
                  <span>Khách hàng</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenuAdmin />
      </SidebarFooter>
    </Sidebar>
  );
}
