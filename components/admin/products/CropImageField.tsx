import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';

import Cropper, { type Area } from 'react-easy-crop';
import { dataURLtoBlob, getCroppedImg } from '@/utils/images';

import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type CropImageFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
};

const CropImageField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  field,
}: CropImageFieldProps<TFieldValues, TName>) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!field.value) {
      setImageSrc(null);
      setCroppedImageUrl(null);
      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [field.value]);

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const onCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedAreaPixels(area);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const dataUrl = await getCroppedImg(imageSrc, croppedAreaPixels, 500, 625);

    const blob = dataURLtoBlob(dataUrl);

    setCroppedImageUrl(dataUrl);
    field.onChange(blob);

    URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
  };

  const cancelUpdateLoadImage = () => {
    setCroppedImageUrl(null);
    field.onChange(null);
  };
  const handleFile = (file: File) => {
    setImageSrc(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="gap-1">
        Ảnh sản phẩm
        <span className="text-red-500 font-bold">*</span>
      </FormLabel>

      {!imageSrc && !croppedImageUrl && (
        <div
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Label
            htmlFor="productImage"
            className="font-normal border-2 border-blue-500 h-10 py-30 md:p-30 border-dashed rounded-md bg-zinc-50 cursor-pointer"
          >
            <p className="w-full text-center">Kéo thả ảnh hoặc bấm để tải ảnh lên</p>
            <Input id="productImage" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </Label>
        </div>
      )}

      {croppedImageUrl && (
        <div className="mt-2 flex">
          <div className="relative group">
            <span
              onClick={cancelUpdateLoadImage}
              className="absolute group-hover:block hidden cursor-pointer top-1 right-1"
            >
              <X className="text-white size-5" />
            </span>
            <Image
              src={croppedImageUrl}
              alt="Cropped"
              width={160}
              height={200}
              className="w-40 h-50 object-cover rounded-md"
            />
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="relative h-125 bg-white rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 5}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            <div
              className="flex items-center px-4 rounded-md text-white h-10 bg-primary cursor-pointer"
              onClick={handleCrop}
            >
              Xác nhận
            </div>
            <div
              className="flex items-center px-4 rounded-md text-white h-10 bg-destructive cursor-pointer"
              onClick={() => setImageSrc(null)}
            >
              Huỷ
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropImageField;
