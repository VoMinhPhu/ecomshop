'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Users,
  Layers,
  Blocks,
  Ticket,
  Receipt,
  ChevronRight,
  MessageCircle,
  BrickWallShield,
} from 'lucide-react';

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
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import UserMenuAdmin from '@/components/admin/nav/UserMenuAdmin';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function NavAdmin() {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={'/icons/logo-small.svg'} width={32} height={32} alt="Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Ecomshop</span>
                  <span className="truncate text-xs">Mua bán sản phẩm chất lượng</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-y-scroll scrollbar-hide">
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) =>
                item.children ? (
                  <Collapsible asChild key={item.label}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="pl-4">
                          <item.icon />
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronRight className="ml-auto transition-transform data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((sub) => (
                            <SidebarMenuSubItem key={sub.label}>
                              <SidebarMenuSubButton asChild>
                                <Link href={sub.href}>{sub.label}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link className="pl-4" href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UserMenuAdmin />
      </SidebarFooter>
    </Sidebar>
  );
}

const sidebarItems = [
  {
    label: 'Tổng quan',
    items: [{ icon: Blocks, label: 'Thống kê', href: '/admin' }],
  },
  {
    label: 'Quản lý sản phẩm',
    items: [
      {
        icon: Box,
        label: 'Sản phẩm',
        children: [
          { label: 'Danh sách sản phẩm', href: '/admin/products' },
          { label: 'Thêm mới sản phẩm', href: '/admin/products/create' },
        ],
      },
      {
        icon: Layers,
        label: 'Danh mục',
        children: [
          { label: 'Danh sách danh mục', href: '/admin/categories' },
          { label: 'Thêm danh mục mới', href: '/admin/categories/create' },
        ],
      },
      {
        icon: BrickWallShield,
        label: 'Thương hiệu',
        children: [
          { label: 'Danh sách thương hiệu', href: '/admin/brands' },
          { label: 'Thêm thương hiệu mới', href: '/admin/brands/create' },
        ],
      },
      { icon: Ticket, label: 'Khuyến mãi', href: '#' },
    ],
  },
  {
    label: 'Bán hàng',
    items: [
      { icon: Receipt, label: 'Đơn hàng', href: '/admin/orders' },
      { icon: Users, label: 'Khách hàng', href: '/admin/customers' },
    ],
  },
  {
    label: 'Hỗ trợ',
    items: [{ icon: MessageCircle, label: 'Tin nhắn', href: '/admin/chats' }],
  },
];
