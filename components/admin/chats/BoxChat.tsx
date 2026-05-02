'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

import { ArrowLeftIcon } from 'lucide-react';

import { useAdminChat } from '@/hooks/ui/chat/useAdminChat';

import useUserStore from '@/stores/user.store';
import { useChatStore } from '@/stores/chat.store';
import { useChatStoreUI } from '@/stores/chat-ui.store';

import RenderMessage from '@/components/chat/RenderMessage';
import ChatInputAdmin from './ChatInputAdmin';

import { cn } from '@/lib/utils';

export default function BoxChat() {
  const { messages, activeConversationId, seen } = useAdminChat();
  const user = useUserStore((s) => s.user);
  const convo = useChatStore((s) => s.conversationMeta[activeConversationId]);
  const { openConvo, setOpenConvo } = useChatStoreUI();

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

  useEffect(() => {
    const hasUnseen = messages.some((m) => {
      return m.conversationId === activeConversationId && !m.isSeen && m.senderId !== user?.id;
    });
    if (hasUnseen) {
      seen(activeConversationId);
    }
  }, [messages]);

  if (!user) return null;

  return (
    <div className={cn('flex-1 md:p-2 bg-gray-50 rounded-r-md', openConvo ? 'block' : 'hidden', 'md:block')}>
      <div className="border inline-flex flex-col w-full h-full rounded-md bg-white">
        <div className="h-16 border-b-2 flex items-center gap-1">
          <div
            onClick={setOpenConvo}
            className="flex md:hidden items-center justify-center w-10 h-10 ml-2 hover:bg-gray-200 rounded-full"
          >
            <ArrowLeftIcon className="text-gray-600" />
          </div>
          <div className="relative">
            <Image
              src={convo?.user.avatar || '/avatar.svg'}
              alt="User name"
              width={44}
              height={44}
              className="w-11 h-11 border rounded-full m-2"
            />
            <span className="absolute bottom-1.75 right-1.75 w-2.75 h-2.75 bg-green-400 rounded-full"></span>
          </div>
          <div>
            <p className="font-semibold">{convo?.user.username || 'Chọn khách hàng để bắt đầu trò chuyện'}</p>
            <p className="text-sm text-gray-500">Trạng thái hoạt động</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 scroll-smooth dropdown-scrollbar md:max-h-[54vh] max-h-[64vh]">
          <RenderMessage messages={messages} />
          <div ref={bottomRef} />
        </div>

        <ChatInputAdmin />
      </div>
    </div>
  );
}
