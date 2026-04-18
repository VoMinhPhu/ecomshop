'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

import { useAdminChat } from '@/hooks/ui/chat/useAdminChat';
import { useChatStore } from '@/stores/chat.store';
import useUserStore from '@/stores/userStore';

import RenderMessage from '@/components/chat/RenderMessage';
import ChatInputAdmin from './ChatInputAdmin';

export default function BoxChat() {
  const { messages, activeConversationId } = useAdminChat();
  const user = useUserStore((s) => s.user);
  const customer = useChatStore((s) => s.conversationMeta[activeConversationId]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const prevConversationId = useRef(activeConversationId);
  // auto scroll
  useEffect(() => {
    const isConversationChanged = prevConversationId.current !== activeConversationId;
    prevConversationId.current = activeConversationId;

    bottomRef.current?.scrollIntoView({
      behavior: isConversationChanged ? 'instant' : 'smooth',
    });
  }, [messages, activeConversationId]);

  if (!user) return null;

  return (
    <div className="flex-1 p-2 bg-gray-50 rounded-r-md">
      <div className="border inline-flex flex-col w-full h-full rounded-md bg-white">
        <div className="h-16 border-b-2 flex items-center gap-2">
          <div className="relative">
            <Image
              src={customer?.avatar || '/avatar.svg'}
              alt="User name"
              width={44}
              height={44}
              className="w-11 h-11 border rounded-full m-2"
            />
            <span className="absolute bottom-1.75 right-1.75 w-2.75 h-2.75 bg-green-400 rounded-full"></span>
          </div>
          <div>
            <p className="font-semibold">{customer?.username || 'Chọn khách hàng để bắt đầu trò chuyện'}</p>
            <p className="text-sm text-gray-500">Trạng thái hoạt động</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 scroll-smooth dropdown-scrollbar max-h-[54vh]">
          <RenderMessage messages={messages} />
          <div ref={bottomRef} />
        </div>

        <ChatInputAdmin />
      </div>
    </div>
  );
}
