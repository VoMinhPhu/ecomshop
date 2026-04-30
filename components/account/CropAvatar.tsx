'use client';

import Image from 'next/image';
import { useState, useCallback, Dispatch, SetStateAction, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUpdateAvatar } from '@/hooks/api/users.hook';
import Cropper, { type Area } from 'react-easy-crop';
import { dataURLtoBlob, getCroppedImg } from '@/utils/images.utils';

const CropAvatar = ({
  imageSrc,
  setImageSrc,
}: {
  imageSrc: string | null;
  setImageSrc: Dispatch<SetStateAction<string | null>>;
}) => {
  const { mutate, isPending } = useUpdateAvatar();

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageSrc(URL.createObjectURL(file));
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(cropped);
  };

  const handleCancel = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    setCroppedImage(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const handleUpdateAvatar = () => {
    if (!croppedImage) return;
    const data = dataURLtoBlob(croppedImage);
    mutate(data);
    handleCancel();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!imageSrc && (
        <Label
          htmlFor="changeAvt"
          className={cn(
            'h-11 cursor-pointer bg-primary text-white rounded-sm text-sm px-4 flex items-center justify-center mt-6',
            isPending && 'opacity-70',
          )}
        >
          <LoaderIcon size={18} className={cn('animate-spin hidden', isPending && 'block')} />
          Chọn ảnh đại diện
          <Input
            type="file"
            id="changeAvt"
            disabled={isPending}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Label>
      )}

      {imageSrc && !croppedImage && (
        <div className="relative w-75 h-75 bg-black rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            <Button onClick={handleCrop}>Xác nhận</Button>
            <Button variant="secondary" onClick={handleCancel}>
              Huỷ
            </Button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className="flex flex-col items-center gap-4">
          <Image
            src={croppedImage}
            width={160}
            height={160}
            alt="Avatar"
            className="rounded-full w-50 h-50 shadow-md"
          />
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setCroppedImage(null)}>
              Chỉnh lại
            </Button>
            <Button onClick={handleUpdateAvatar}>Cập nhật avatar</Button>
            <Button variant="destructive" onClick={handleCancel}>
              Huỷ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropAvatar;
