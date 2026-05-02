'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MessageCircleMoreIcon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';
import { useClientChat } from '@/hooks/ui/chat/useClientChat';

import ChatInput from './ChatInput';
import { Button } from '../ui/button';
import RenderMessage from './RenderMessage';

export default function CustomerChatSection() {
  const { messages, seen } = useClientChat();
  const user = useUserStore((s) => s.user);

  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesLength = useRef(0);

  // auto scroll chỉ khi có tin nhắn mới
  useEffect(() => {
    const isNewMessage = messages.length > prevMessagesLength.current;
    prevMessagesLength.current = messages.length;

    if (isNewMessage) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // seen khi có tin nhắn mới và chat box đang mở
  useEffect(() => {
    if (!chatBoxOpen) return;

    const hasUnseen = messages.some((m) => !m.isSeen && m.senderId !== user?.id);

    if (hasUnseen) {
      seen();
    }
  }, [messages, chatBoxOpen]);

  if (!user) return null;

  return (
    <div>
      <div
        onClick={() => {
          setChatBoxOpen(true);
          seen();
        }}
        className={cn(
          'fixed bg-white size-13 z-10 border-2 shadow-sm flex items-center justify-center md:bottom-4 bottom-8 right-4 rounded-full cursor-pointer transition-all duration-100 ease-out',
          chatBoxOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100',
        )}
      >
        <MessageCircleMoreIcon size={32} color="green" />
      </div>

      <div
        className={cn(
          'fixed flex flex-col bottom-4 md:right-4 w-[calc(100%-8px)] mx-1 z-10 shadow-md border rounded-md md:w-90 h-115 bg-white transition-all duration-300 ease-out origin-bottom-right',
          chatBoxOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none',
        )}
      >
        <div className="p-1.75 flex items-center gap-1 border-b-2">
          <Image src="/icons/logo-small.svg" alt="Logo" width={36} height={36} className="m-2" />
          <span className="text-sm">Quản trị viên</span>

          <div className="flex-1 text-right">
            <Button onClick={() => setChatBoxOpen(false)} variant="ghost" size="icon">
              <XIcon />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 scroll-smooth dropdown-scrollbar">
          <RenderMessage messages={messages} />
          <div ref={bottomRef} />
        </div>

        <ChatInput />
      </div>
    </div>
  );
}
