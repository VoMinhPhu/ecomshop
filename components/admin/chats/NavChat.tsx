'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SearchIcon } from 'lucide-react';

import { useAdminChat } from '@/hooks/ui/chat/useAdminChat';

import { useChatStoreUI } from '@/stores/chat-ui.store';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

export default function NavChat() {
  const { conversationMeta, setActiveConversationId, loadingConvos } = useAdminChat();
  const { openConvo, setOpenConvo } = useChatStoreUI();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const sortedConversations = Object.values(conversationMeta)
    .sort((a, b) => new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime())
    .filter((c) => filter === 'all' || c.unreadCount > 0);

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setOpenConvo();
  };

  return (
    <div className={cn('md:max-w-70 w-full border-r', openConvo && 'hidden md:block')}>
      <p className="font-semibold text-lg ml-2 mt-2">Đoạn chat</p>
      <div className="relative m-2">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-gray-600" />
        <Input type="text" className="border rounded-full pl-10 h-8" placeholder="Tìm kiếm khách hàng..." />
      </div>

      <div className="flex gap-2 px-2 mb-2">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'text-sm hover:bg-gray-100 rounded-lg px-2 py-0.5 cursor-pointer',
            filter === 'all' && 'bg-gray-100 font-semibold',
          )}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={cn(
            'text-sm hover:bg-gray-100 rounded-lg px-2 py-0.5 cursor-pointer',
            filter === 'unread' && 'bg-gray-100 font-semibold',
          )}
        >
          Chưa đọc
        </button>
      </div>

      <div className="mx-2 flex flex-col gap-2 h-[57vh] dropdown-scrollbar pr-1">
        {sortedConversations.map((c) => (
          <div
            onClick={() => handleSelectConversation(c.id)}
            key={c.id}
            className="flex w-full border rounded-md hover:bg-gray-100 relative"
          >
            <div className="relative flex min-w-12 h-12 m-2">
              <Image
                src={c.user.avatar || '/avatar.svg'}
                alt="User name"
                width={48}
                height={48}
                className="w-12 h-12 block border rounded-full"
              />
              <span className="absolute bottom-0.25 right-0.25 w-2.75 h-2.75 bg-green-400 rounded-full"></span>
            </div>
            <div className="flex flex-col w-full justify-start gap-0 pt-2">
              <p className="font-semibold">{c.user.username}</p>
              <p className="text-sm text-gray-700 truncate max-w-46">
                {c.revoked ? <span className="italic opacity-70">Tin nhắn đã bị thu hồi</span> : c.lastMessage}
              </p>
            </div>
            {c.unreadCount > 0 && (
              <span className="absolute top-1/2 -translate-y-1/2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </div>
        ))}
        {sortedConversations.length === 0 && !loadingConvos && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Không có đoạn chat nào</p>
          </div>
        )}

        {loadingConvos && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        )}
      </div>
    </div>
  );
}
