import Image from 'next/image';
import ManageImageDialog from './ManageImageDialog';

type Props = {
  productId: string;
  thumbnail: string;
  images: {
    id: string;
    url: string;
  }[];
  name: string;
};

export default function MangageImage({ images, name, thumbnail, productId }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 justify-between mb-2">
        <p className="font-semibold">Ảnh sản phẩm</p>
        <ManageImageDialog images={images} thumbnail={thumbnail} productId={productId} />
      </div>
      <div className="flex gap-2 justify-center">
        <div className="flex gap-2">
          <Image src={thumbnail} width={200} height={200} alt={name} className="md:w-50 mx-auto md:mx-0" />
        </div>
        <div className="hidden md:grid grid-cols-5 w-full gap-3">
          {images.map((img) => (
            <Image src={img.url} width={100} height={100} alt={name} key={img.id} className="h-auto mx-auto" />
          ))}
        </div>
      </div>
    </div>
  );
}
