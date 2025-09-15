'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import UserMenuAdmin from '@/components/admin/nav/UserMenuAdmin';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Blocks, Box, Layers, Receipt, Ticket, Users, ChevronRight } from 'lucide-react';

export default function NavAdmin() {
  const pathname = usePathname();
  const isProductPage = pathname.startsWith('/admin/products');
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
            <Collapsible asChild open={isProductPage}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="pl-4" href="/admin/products">
                    <Box />
                    <span>Sản phẩm</span>
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/products">Danh sách sản phẩm</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/admin/products/create">Thêm mới sản phẩm</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link className="pl-4" href="#">
                  <Layers />
                  <span>Danh mục</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
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
