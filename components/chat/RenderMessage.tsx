'use client';

import { Message } from '@/types/chat.type';
import { getMessagePosition } from '@/utils/chat.utils';

import MessageItem from './MessageItem';

import useUserStore from '@/stores/userStore';
import { useChatStore } from '@/stores/chat.store';

type Props = {
  messages: Message[];
};

export default function RenderMessage({ messages }: Props) {
  const user = useUserStore((s) => s.user);

  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const toUser = useChatStore((s) => s.conversationMeta[activeConversationId]);
  if (!user) return null;

  const lastMyMessageIndex = messages.reduce((last, m, i) => (m.senderId === user.id ? i : last), -1);

  return (
    <div className="flex flex-col gap-1 w-full mt-1">
      {messages.map((m, index) => (
        <MessageItem
          key={m.id}
          message={m}
          isMe={m.senderId === user.id}
          isLastMyMessage={index === lastMyMessageIndex}
          position={getMessagePosition(messages, index)}
          toUser={toUser}
        />
      ))}
    </div>
  );
}
