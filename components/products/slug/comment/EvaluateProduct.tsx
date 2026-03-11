'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

import CommentItem from './CommentItem';
import AddCommentForm from './AddCommentForm';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';

import AuthPopup from '@/components/auth/AuthPopup';
import { useGetRating, useGetReview } from '@/hooks/api/review';

type Props = {
  productId: string;
};

export default function EvaluateProduct({ productId }: Props) {
  const [comment, setComment] = useState<boolean>(false);
  const [openAuth, setOpenAuth] = useState<boolean>(false);

  const { data: ratingData, isPending: getRatingPending } = useGetRating(productId);
  const { data: comments, isPending: getCommentPending } = useGetReview(productId);

  const user = useUserStore((s) => s.user);

  const handleOpenComment = () => {
    setComment(!comment);
  };

  return (
    <div className="max-w-300 px-3 pt-3 pb-10 bg-white mx-auto mt-3 rounded-xs">
      <h3 className="font-semibold text-xl">Đánh giá sản phẩm</h3>
      <div className="mt-6">
        <p className="text-3xl mb-2">KHÁCH HÀNG NHẬN XÉT</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {ratingData?.total ? (
            <div className="px-1 flex flex-col items-center justify-center">
              <p className="font-semibold">Đánh giá trung bình</p>
              <p className="text-xl font-semibold text-red-500">{ratingData.average} / 5</p>
              <p className="text-zinc-500">({ratingData.total} đánh giá)</p>
            </div>
          ) : (
            <div className="px-4">
              <p className="mx-auto mt-2 py-1.5 px-3 bg-amber-100 rounded-md text-center text-amber-500">
                Chưa có nhận xét nào, hãy là người đầu tiên đánh giá cho sản phẩm
              </p>
            </div>
          )}
          <div>
            {ratingData?.ratings.map((r) => (
              <div key={r.star} className="flex gap-2 items-center">
                <span className="flex items-center gap-1">
                  {r.star}
                  <Star className="size-3 fill-zinc-800 text-zinc-700" />
                </span>
                <div className="w-full relative">
                  <p className="w-full h-2.5 bg-zinc-200 rounded-full"></p>
                  <p className="h-2.5 bg-primary rounded-full absolute top-0" style={{ width: `${r.percent}%` }}></p>
                </div>
                <span className="w-12">{r.percent}%</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Chia sẻ nhận xét về sản phẩm</p>
            {user ? (
              <Button size="lg" onClick={handleOpenComment}>
                {!comment ? 'Thêm đánh giá của bạn' : 'Đóng'}
              </Button>
            ) : (
              <Button size="lg" onClick={() => setOpenAuth(true)}>
                Thêm đánh giá của bạn
              </Button>
            )}
          </div>
        </div>
        <div className={cn('mt-4 hidden', comment && 'block')}>
          <AddCommentForm productId={productId} />
        </div>
        <div className="border-t mt-6 pt-4">
          <h3 className="mt-2 font-semibold mb-4">Nhận xét của những khách hàng khác</h3>
          <div>
            {comments?.map((rv) => (
              <CommentItem key={rv.id} item={{ ...rv, role: 'user' }} />
            ))}
          </div>
        </div>
      </div>
      <AuthPopup open={openAuth} onOpenChange={setOpenAuth} />
    </div>
  );
}
