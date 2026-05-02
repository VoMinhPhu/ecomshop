import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImageIcon, Loader, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useFileUpload } from '@/hooks/ui/useFileUpload';
import { useUpdateImageProduct } from '@/hooks/api/products.hook';
import DeleteImageBtn from './DeleteImageBtn';

type Props = {
  image: {
    id: string;
    url: string;
  };
};

export default function ManageDetailImage({ image }: Props) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
  });

  const { mutate: updateImageProductMutate, isPending } = useUpdateImageProduct();

  const previewUrl = files[0]?.preview || image.url;
  const fileName = files[0]?.file.name || null;

  const handleChangeThumbnail = () => {
    updateImageProductMutate(
      {
        id: image.id,
        image: files[0].file as File,
      },
      {
        onSuccess: () => removeFile(files[0].id),
      },
    );
  };

  return (
    <div className="group relative">
      <Image
        src={previewUrl}
        width={400}
        height={400}
        alt="Ảnh chi tiết"
        className="mx-auto mb-auto h-auto lg:max-w-[95%] md:max-w-60 object-fill"
      />
      <div className="group-hover:flex gap-2 p-4 hidden rounded-sm items-end justify-end w-full h-full absolute top-0 bg-black/5">
        {fileName && (
          <span
            aria-label={`Remove ${fileName}`}
            className="absolute top-0 right-0 p-2 text-red-500 cursor-pointer"
            onClick={() => removeFile(files[0]?.id)}
          >
            <X />
          </span>
        )}
        <div className="relative flex gap-2 mb-4 md:mb-0">
          <Button size="lg" variant="outline" aria-haspopup="dialog" onClick={openFileDialog}>
            <ImageIcon />
            {fileName ? 'Chọn ảnh khác' : 'Chọn ảnh'}
          </Button>
          <input {...getInputProps()} aria-label="Upload image file" className="sr-only" tabIndex={-1} />
          <Button
            size="lg"
            className={cn('hidden', fileName && 'flex')}
            disabled={isPending}
            onClick={handleChangeThumbnail}
          >
            <Loader className={cn('animate-spin', !isPending && 'hidden')} />
            {isPending ? 'Đang thay đổi' : ' Thay đổi'}
          </Button>
          <DeleteImageBtn imageId={image.id} />
        </div>
      </div>
    </div>
  );
}
