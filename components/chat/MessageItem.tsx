'use client';

import Image from 'next/image';
import { Message } from '@/types/chat.type';
import { getBubbleStyle } from '@/utils/chat.utils';

type Props = {
  message: Message;
  isMe: boolean;
  position: string;
  isLastMyMessage: boolean;
  toUser?: {
    username: string;
    avatar: string;
  };
};

export default function MessageItem({ message, isMe, position, toUser, isLastMyMessage }: Props) {
  const showAvatar = !isMe && (position === 'last' || position === 'single');

  return (
    <div className={`flex w-full items-end gap-1.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div className="w-8 h-8 flex-shrink-0">
          {showAvatar ? (
            <Image
              src={toUser?.avatar ?? '/avatar.svg'}
              alt="avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border"
            />
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      )}

      <div className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <p className={getBubbleStyle(isMe, position)}>{message.content}</p>

        {/* Status */}
        {isMe && isLastMyMessage && (
          <span className="text-xs opacity-60">
            {message.status === 'sending' && 'Đang gửi...'}
            {message.status === 'failed' && 'Có lỗi'}
            {message.status === 'sent' && !message.isSeen && 'Đã gửi'}
            {message.status === 'sent' && message.isSeen && 'Đã xem'}
          </span>
        )}
      </div>
    </div>
  );
}
