'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrushCleaning, Image, ImageIcon, Loader, UploadIcon, XIcon } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useFileUpload } from '@/hooks/use-file-upload';
import { useAddNewImagesProduct } from '@/hooks/products';

import { cn } from '@/lib/utils';
import { addNewImageProductSchema, AddNewImageProductSchema } from '@/schemas/products';

type Props = {
  productId: string;
};

export default function AddNewImageBtn({ productId }: Props) {
  const { mutate: addNewImagesMutate, isPending } = useAddNewImagesProduct();

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 10;

  const [
    { files, isDragging, errors },
    {
      removeFile,
      clearFiles,
      getInputProps,
      handleDrop,
      openFileDialog,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
    },
  ] = useFileUpload({
    accept: 'image/*',
    // initialFiles,
    maxFiles,
    maxSize,
    multiple: true,
  });

  const form = useForm<AddNewImageProductSchema>({
    resolver: zodResolver(addNewImageProductSchema),
    defaultValues: {
      productId: productId,
      images: [],
    },
  });

  useEffect(() => {
    const images = files.map((f) => f.file).filter((file): file is File => file instanceof File);

    form.setValue('images', images, { shouldValidate: true });
  }, [files]);

  const onSubmit = (data: AddNewImageProductSchema) => {
    addNewImagesMutate(data, {
      onSuccess: () => clearFiles(),
    });
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 p-8 rounded-sm">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} size={'lg'}>
            <Image />
            Thêm ảnh mới
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-[calc(100vw-100px)] h-[calc(100vh-60px)]">
          <DialogHeader>
            <DialogTitle>Thêm ảnh mới</DialogTitle>
            <DialogDescription>Thêm ảnh mới cho sản phẩm (có thể chọn nhiều ảnh).</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <div
                className="relative flex min-h-52 flex-col items-center not-data-[files]:justify-center overflow-hidden rounded-xl border-2 border-input border-dashed p-4 transition-colors bg-accent/50"
                data-dragging={isDragging || undefined}
                data-files={files.length > 0 || undefined}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input {...getInputProps()} aria-label="Upload image file" className="sr-only" />
                {files.length > 0 ? (
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-medium text-sm hidden md:flex pr-2">Ảnh ({files.length})</h3>
                      <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                        <Button
                          type="button"
                          disabled={files.length >= maxFiles}
                          onClick={openFileDialog}
                          variant="outline"
                        >
                          <UploadIcon aria-hidden="true" className="-ms-0.5 size-3.5 opacity-60" />
                          Thêm ảnh khác
                        </Button>
                        <Button type="button" disabled={files.length == 0} onClick={clearFiles} variant="destructive">
                          <BrushCleaning
                            aria-hidden="true"
                            className="-ms-0.5 size-3.5 opacity-60 text-white"
                            strokeWidth={3}
                          />
                          Xóa tất cả ảnh
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 pt-4 overflow-y-scroll h-[calc(100vh-300px)]">
                      {files.map((file) => (
                        <div
                          className="relative aspect-square lg:w-60 lg:h-60 md:w-[90%] md:h-auto h-36 w-36 mx-auto rounded-md"
                          key={file.id}
                        >
                          <img
                            alt={file.file.name}
                            className="h-auto rounded-[inherit] object-cover"
                            src={file.preview}
                          />
                          <Button
                            aria-label="Remove image"
                            className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background cursor-pointer"
                            onClick={() => removeFile(file.id)}
                            size="icon"
                          >
                            <XIcon className="size-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-3 text-center h-[calc(100vh-280px)]">
                    <div
                      aria-hidden="true"
                      className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                    >
                      <ImageIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 font-medium text-sm">Có thể kéo ảnh vào đây.</p>
                    <p className="text-muted-foreground text-xs">SVG, PNG, JPG hoặc GIF (tối đa. {maxSizeMB}MB)</p>
                    <Button type="button" className="mt-4" onClick={openFileDialog} variant="outline">
                      <UploadIcon aria-hidden="true" className="-ms-1 opacity-60" />
                      Chọn ảnh
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button size={'lg'} type="button" variant="secondary">
                Đóng
              </Button>
            </DialogClose>
            <Button size="lg" disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
              <Loader className={cn('animate-spin', !isPending && 'hidden')} />
              {isPending ? 'Đang thêm mới' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
