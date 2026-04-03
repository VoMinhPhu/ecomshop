'use client';

import { Message } from '@/types/chat.type';
import useUserStore from '@/stores/userStore';
import MessageItem from './MessageItem';
import { getMessagePosition } from '@/utils/chat.utils';

type Props = {
  messages: Message[];
};

export default function RenderMessage({ messages }: Props) {
  const user = useUserStore((s) => s.user);
  if (!user) return null;

  return (
    <div className="flex flex-col gap-1 w-full mt-1">
      {messages.map((m, index) => (
        <MessageItem
          key={m.id}
          message={m}
          isMe={m.senderId === user.id}
          position={getMessagePosition(messages, index)}
        />
      ))}
    </div>
  );
}
