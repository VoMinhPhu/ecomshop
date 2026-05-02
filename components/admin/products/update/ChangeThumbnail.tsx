'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { useChangeThumbnail } from '@/hooks/api/products.hook';
import { useFileUpload } from '@/hooks/ui/useFileUpload';

import { CircleUserRoundIcon, ImageIcon, Loader } from 'lucide-react';

type Props = {
  productId: string;
  thumbnail: string;
};

export default function ChangeThumbnail({ thumbnail, productId }: Props) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
  });

  const { mutate: changeThumbnailMutate, isPending } = useChangeThumbnail();

  const previewUrl = files[0]?.preview || thumbnail;
  const fileName = files[0]?.file.name || null;

  const handleChangeThumbnail = () => {
    changeThumbnailMutate(
      {
        id: productId,
        image: files[0].file as File,
      },
      {
        onSuccess: () => removeFile(files[0].id),
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex flex-col md:flex-row items-center gap-4 align-top">
        <div
          aria-label={previewUrl ? 'Upload preview' : 'Default user avatar'}
          className="relative flex shrink-0 items-center justify-center overflow-hidden"
        >
          {previewUrl ? (
            <Image alt="Upload preview" className="object-cover mt-6" height={256} src={previewUrl} width={256} />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="opacity-60" size={16} />
            </div>
          )}
        </div>
        <div className="relative flex gap-2 mb-4 md:mb-0">
          <Button variant="outline" aria-haspopup="dialog" onClick={openFileDialog}>
            <ImageIcon />
            {fileName ? 'Chọn ảnh khác' : 'Chọn ảnh'}
          </Button>
          <input {...getInputProps()} aria-label="Upload image file" className="sr-only" tabIndex={-1} />
          <Button disabled={isPending || !fileName} onClick={handleChangeThumbnail}>
            <Loader className={cn('animate-spin', !isPending && 'hidden')} />
            {isPending ? 'Đang thay đổi' : ' Thay đổi'}
          </Button>
        </div>
      </div>
      {fileName && (
        <div className="inline-flex gap-2 text-sm">
          <p aria-live="polite" className="truncate text-muted-foreground">
            {fileName}
          </p>
          <button
            aria-label={`Remove ${fileName}`}
            className="font-medium text-destructive hover:underline"
            onClick={() => removeFile(files[0]?.id)}
            type="button"
          >
            Hủy bỏ
          </button>
        </div>
      )}
    </div>
  );
}
