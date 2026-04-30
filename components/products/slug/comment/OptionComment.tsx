'use client';

import { EllipsisVerticalIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

type Props = {
  commentId: string;
  comment: string;
  rating?: number;
  curentUserId?: string;
  userId?: string;
};

export default function OptionComment({ commentId, comment, rating, userId, curentUserId }: Props) {
  return (
    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="bg-gray-50 rounded-2xl p-1">
            <EllipsisVerticalIcon className="size-5 cursor-pointer text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end" className="w-35">
          {userId === curentUserId && (
            <EditComment commentId={commentId} initialComment={comment} initialRating={rating} />
          )}
          <DeleteComment commentId={commentId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
