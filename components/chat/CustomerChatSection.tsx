'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MessageCircleMoreIcon, SendIcon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';
import { useClientChat } from '@/hooks/ui/chat/useClientChat';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import RenderMessage from './RenderMessage';

export default function CustomerChatSection() {
  const { messages, sendMessage } = useClientChat();
  const user = useUserStore((s) => s.user);

  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [value, setValue] = useState('');

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div>
      <div
        onClick={() => setChatBoxOpen(true)}
        className={cn(
          'fixed bg-white size-13 z-10 border-2 shadow-sm flex items-center justify-center bottom-4 right-4 rounded-full cursor-pointer transition-all duration-100 ease-out',
          chatBoxOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100',
        )}
      >
        <MessageCircleMoreIcon size={32} color="green" />
      </div>

      <div
        className={cn(
          'fixed flex flex-col bottom-4 right-4 z-10 shadow-md border rounded-md w-90 h-115 bg-white transition-all duration-300 ease-out origin-bottom-right',
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

        <div className="p-2 pb-3 flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2 w-full"
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
              className="rounded-md resize-none overflow-hidden min-h-[36px] max-h-[120px]"
              placeholder="Nhập tin nhắn..."
            />

            <Button type="submit" disabled={!value.trim()}>
              <SendIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
