'use client';

import { useEffect } from 'react';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { AlertCircleIcon, BrushCleaning, ImageIcon, UploadIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';

import { useFileUpload } from '@/hooks/use-file-upload';

type UploadImagesFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  disabled?: boolean;
};

export default function UploadImages<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  field,
  disabled = false,
}: UploadImagesFieldProps<TFieldValues, TName>) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 15;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif',
    // initialFiles,
    maxFiles,
    maxSize,
    multiple: true,
  });

  useEffect(() => {
    if (!field.value || field.value.length === 0) {
      clearFiles();
    }
  }, [field.value]);

  useEffect(() => {
    const blobs = files.filter((f) => f.file instanceof File).map((f) => f.file);
    field.onChange(blobs);
  }, [files.length]);

  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="gap-1">
        Ảnh sản phẩm
        <span className="text-red-500 font-bold">*</span>
      </FormLabel>
      <div
        className="relative flex min-h-52 flex-col items-center not-data-[files]:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
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
                <Button type="button" disabled={files.length >= maxFiles} onClick={openFileDialog} variant="outline">
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

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 pt-4">
              {files.map((file) => (
                <div
                  className="relative aspect-square lg:w-60 lg:h-60 md:w-45 md:h-45 h-36 w-36 mx-auto rounded-md bg-accent"
                  key={file.id}
                >
                  <img
                    alt={file.file.name}
                    className="lg:size-60 md:size-45 size-36 rounded-[inherit] object-cover"
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
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
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

      {errors.length > 0 && (
        <div className="flex items-center gap-1 text-destructive text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
