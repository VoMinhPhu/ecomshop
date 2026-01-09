'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, MessageSquareTextIcon, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField } from '@/components/ui/form';

import { useAddComment } from '@/hooks/review';

import { addCommentSchema, AddCommentType } from '@/schemas/review';

import { cn } from '@/lib/utils';

type Props = {
  productId: string;
};

export default function AddCommentForm({ productId }: Props) {
  const { mutate: addCommentMutate, isPending } = useAddComment();

  const [selected, setSelected] = useState<number>(5);
  const [hovered, setHovered] = useState<number>(0);

  const form = useForm<AddCommentType>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: '',
      productId: productId,
      rating: `${selected}`,
    },
  });

  function onSubmit(values: AddCommentType) {
    addCommentMutate(values, {
      onSuccess: () => form.reset(),
    });
  }
  return (
    <div>
      <p className="font-semibold">Thêm nhận xét của bạn về sản phẩm</p>
      <div className="flex items-center gap-2">
        <p>Đánh giá: </p>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              'size-4 cursor-pointer transition-colors',
              i <= (hovered || selected) ? 'text-amber-300 fill-amber-300' : 'text-gray-300',
            )}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => {
              setSelected(i);
              form.setValue('rating', `${i}`);
            }}
          />
        ))}
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <Textarea
                {...field}
                className="mt-2"
                placeholder="Đánh giá về sản phẩm"
                maxLength={512}
                spellCheck={false}
              />
            )}
          />
          <div className="text-right">
            <Button disabled={isPending} className="" type="submit" size="lg">
              <Loader className={cn('animate-spin', !isPending && 'hidden')} />
              <MessageSquareTextIcon className={cn(isPending && 'hidden')} />
              {isPending ? 'Đang thêm đánh giá' : 'Thêm đánh giá'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
