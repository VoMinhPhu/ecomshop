'use client';

import { Message } from '@/types/chat.type';
import { getBubbleStyle } from '@/utils/chat.utils';

type Props = {
  message: Message;
  isMe: boolean;
  position: string;
};

export default function MessageItem({ message, isMe, position }: Props) {
  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <p className={getBubbleStyle(isMe, position)}>{message.content}</p>

        {/* Status */}
        {isMe && position !== 'middle' && (
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
