'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MessageCircleMoreIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import NavChat from '../admin/chats/NavChat';
import BoxChat from '../admin/chats/BoxChat';

export default function AdminChat() {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <div className="fixed bg-white size-13 z-10 border-2 shadow-sm flex items-center justify-center md:bottom-4 bottom-8 right-4 rounded-full cursor-pointer transition-all duration-100 ease-out">
          <MessageCircleMoreIcon size={32} color="green" />
        </div>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[calc(100%-72px)] md:min-w-[calc(100%-8px)] gap-0 p-0 min-h-3/4">
        <Card className="h-full gap-3 border-none">
          <DialogHeader className="mx-8">
            <DialogTitle>Tin nhắn</DialogTitle>
            <DialogDescription>Nhắn tin trực tiếp với khách hàng</DialogDescription>
          </DialogHeader>

          <CardContent className="flex-1">
            <div className="border rounded-md flex h-full">
              <NavChat />
              <BoxChat />
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
