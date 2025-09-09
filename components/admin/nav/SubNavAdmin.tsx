import * as React from 'react';
import Link from 'next/link';
import { Flag, Send } from 'lucide-react';

import {
  SidebarMenu,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

const SubNavAdmin = (props: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              <Link href="#">
                <Flag />
                <span>Hỗ trợ</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              <Link href="#">
                <Send />
                <span>Nhận xét</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default SubNavAdmin;
