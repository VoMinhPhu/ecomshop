'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageIcon, SendIcon } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';
import { useAdminChat } from '@/hooks/ui/chat/useAdminChat';

import useUserStore from '@/stores/user.store';

export default function ChatInputAdmin() {
  const { messages, activeConversationId, sendMessage } = useAdminChat();
  const user = useUserStore((s) => s.user);

  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  // auto resize
  const handleHeightChange = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  // submit
  const handleSend = async () => {
    if (!value.trim()) return;

    await sendMessage(value);

    setValue('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };
  return (
    <div className="p-2 flex items-center gap-2">
      <ImageIcon className="text-gray-500 cursor-pointer" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 w-full"
      >
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onInput={handleHeightChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          className="rounded-4xl resize-none overflow-hidden min-h-[36px] max-h-[120px]"
          placeholder="Nhập tin nhắn..."
        />

        <button className="px-2 cursor-pointer" disabled={!value.trim()}>
          <SendIcon className="text-green-500 size-5" />
        </button>
      </form>
    </div>
  );
}
