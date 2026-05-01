'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import useUserStore from '@/stores/userStore';

import { Review } from '@/types/review.type';

import AddReplyForm from './AddReplyForm';
import OptionComment from './OptionComment';

export default function CommentItem({ item, level = 0 }: { item: Review; level?: number }) {
  const user = useUserStore((s) => s.user);

  return (
    <div className={`my-2`} style={{ marginLeft: level * 40 }}>
      <div className="flex gap-2 items-start group">
        <Image
          width={32}
          height={32}
          alt={item.user.name}
          src={item.user.avatar ?? '/avatar.svg'}
          className={cn('rounded-full border', item.role === 'admin' && 'border-red-500')}
        />
        <div className="flex-1">
          <p className="font-semibold text-sm flex items-center gap-2 w-fit">
            {item.user.name}
            {item.role === 'admin' && <span className="text-xs text-blue-600">Admin</span>}
          </p>
          {item.rating && (
            <p className="flex gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="size-2.5 text-amber-300 fill-amber-300" />
              ))}
            </p>
          )}
          <p className="text-sm my-1">{item.comment}</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(item.createdAt).toLocaleString('vi-VN')}</p>

          <AddReplyForm name={item.user.name} commentId={item.id} level={level} />
        </div>
        {user?.id === item.user.id || user?.role === 'admin' ? (
          <OptionComment
            commentId={item.id}
            comment={item.comment}
            rating={item.rating}
            userId={item.user.id}
            userRole={user.role}
            curentUserId={user.id}
          />
        ) : null}
      </div>
      {item.replies?.map((r: any) => (
        <CommentItem key={r.id} item={r} level={level + 1} />
      ))}
    </div>
  );
}
