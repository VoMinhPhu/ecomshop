'use client';

import { SendIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useRef, useState } from 'react';
import { useClientChat } from '@/hooks/ui/chat/useClientChat';

export default function ChatInput() {
  const { sendMessage } = useClientChat();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [value, setValue] = useState<string>('');

  // submit
  const handleSend = async () => {
    if (!value.trim()) return;

    await sendMessage(value);

    setValue('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // auto resize
  const handleHeightChange = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  return (
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
  );
}
