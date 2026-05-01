'use client';

import { UserRole } from '@/types/users.type';

import { EllipsisVerticalIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import EditReply from './EditReply';
import EditComment from './EditComment';
import DeleteReply from './DeleteReply';
import DeleteComment from './DeleteComment';

type Props = {
  rating?: number;
  userId?: string;
  comment: string;
  commentId: string;
  userRole: UserRole;
  curentUserId?: string;
};

export default function OptionComment({ commentId, comment, rating, userId, curentUserId, userRole }: Props) {
  const isOwner = userId === curentUserId;
  const isAdmin = userRole === UserRole.ADMIN;

  return (
    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="bg-gray-50 rounded-2xl p-1">
            <EllipsisVerticalIcon className="size-5 cursor-pointer text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end" className="w-35">
          {rating !== undefined && (
            <>
              {isOwner && <EditComment commentId={commentId} initialComment={comment} initialRating={rating} />}

              {(isOwner || isAdmin) && <DeleteComment commentId={commentId} />}
            </>
          )}
          {rating === undefined && (
            <>
              {isOwner && <EditReply commentId={commentId} initialComment={comment} />}

              {(isOwner || isAdmin) && <DeleteReply replyId={commentId} />}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
