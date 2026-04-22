'use client';

import { EllipsisVerticalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuPortal, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { useRevokedMessage } from '@/hooks/api/chat.hook';

type Props = {
  messageId: string;
  revoked: boolean;
};

export default function OptionMessage({ messageId, revoked }: Props) {
  const { mutate, isPending } = useRevokedMessage();
  const handleRemoveMessage = () => {
    console.log('Remove message with id:', messageId);
    mutate(messageId);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'absolute -left-7 opacity-0 group-hover:opacity-100 flex items-center hover:bg-gray-200 rounded-full p-0.5',
            revoked && 'hidden',
          )}
        >
          <EllipsisVerticalIcon className="text-gray-600 size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end" sideOffset={6} className="border shadow-sm rounded-sm bg-gray-50">
          <button onClick={handleRemoveMessage} className="text-gray-700 w-full text-sm font-semibold cursor-pointer">
            Thu hồi
          </button>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
