import { Message } from '@/types/chat.type';

export function getMessagePosition(messages: Message[], index: number) {
  const current = messages[index];
  const prev = messages[index - 1];
  const next = messages[index + 1];

  const isSamePrev = prev && prev.senderId === current.senderId;
  const isSameNext = next && next.senderId === current.senderId;

  if (!isSamePrev && !isSameNext) return 'single';
  if (!isSamePrev && isSameNext) return 'first';
  if (isSamePrev && isSameNext) return 'middle';
  if (isSamePrev && !isSameNext) return 'last';

  return 'single';
}

export function getBubbleStyle(isMe: boolean, position: string) {
  const base = 'px-3 py-1.5 max-w-[75%] whitespace-pre-wrap break-words';

  if (isMe) {
    return `${base} bg-green-500 text-white ${
      position === 'single'
        ? 'rounded-3xl'
        : position === 'first'
          ? 'rounded-t-3xl rounded-bl-3xl rounded-br-xl'
          : position === 'middle'
            ? 'rounded-l-3xl rounded-r-xl'
            : 'rounded-b-3xl rounded-tl-3xl rounded-tr-xl'
    }`;
  }

  return `${base} bg-gray-200 text-black ${
    position === 'single'
      ? 'rounded-3xl'
      : position === 'first'
        ? 'rounded-t-3xl rounded-br-3xl rounded-bl-xl'
        : position === 'middle'
          ? 'rounded-r-3xl rounded-l-xl'
          : 'rounded-b-3xl rounded-tr-3xl rounded-tl-xl'
  }`;
}
