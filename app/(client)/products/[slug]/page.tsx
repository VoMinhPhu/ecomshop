'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import EvaluateProduct from '@/components/products/EvaluateProduct';
import ProductDetailLoading from '@/components/products/ProductDetailLoading';

import { useAddProductToCart } from '@/hooks/cart';
import { useGetProductBySlug } from '@/hooks/products';

import { formatCurrency } from '@/utils/number';

const page = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const { slug } = useParams();

  const { data, isLoading } = useGetProductBySlug(slug as string);
  const { mutate: addProductToCartMutate, isPending } = useAddProductToCart();

  const handleUpdateQuantity = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    }
  };
  if (isLoading) return <ProductDetailLoading />;
  if (!data) return null;

  const handleAddToCart = () => {
    addProductToCartMutate({
      productId: data.id,
      quantity: quantity,
    });
  };

  return (
    <>
      <div className="max-w-300 mx-auto flex items-center gap-2 text-zinc-500 mb-2">
        <Link href={'/'} className="">
          Trang chủ
        </Link>
        <span>&gt;</span>
        <Link href={'/products'} className="">
          Sản phẩm
        </Link>
      </div>
      <div className="lg:max-w-300 bg-white mx-auto md:flex">
        <div>
          <Image src={data.thumbnail} alt={data.name} width={350} height={450} className="p-4 mx-auto" />
        </div>
        <div className="flex-1 pt-6 px-8 pb-4 relative">
          <p className="font-semibold text-xl h-14 line-clamp-2">{data.name}</p>
          <p>
            Thương hiệu: <span className="text-blue-500">{data.brand.name}</span>
          </p>
          <p className="text-3xl font-semibold text-primary mt-1 flex gap-3">
            {formatCurrency(data.salePrice ? data.salePrice * quantity : data.price * quantity)}
            <span className="flex items-start">
              <span className="text-sm">VND</span>
            </span>
          </p>

          {data.salePrice && (
            <p className="text-sm font-semibold text-zinc-500 line-through mt-1 flex gap-3">
              {formatCurrency(data.price * quantity)}
              <span className="flex items-start">
                <span className="text-sm">VND</span>
              </span>
            </p>
          )}

          <div className="md:absolute fixed bg-white z-10 bottom-0 px-3 w-full left-0 pb-4">
            <div className="mb-6 flex items-center">
              <div className="mr-10">Số Lượng:</div>
              <div className="flex items-center justify-start gap-2 mt-3">
                <button
                  onClick={() => handleUpdateQuantity('decrease')}
                  disabled={quantity === 1}
                  className="flex items-center justify-center border h-10 w-10 rounded-sm disabled:opacity-50"
                >
                  <Minus className="size-4.5" />
                </button>

                <span className="px-16 h-10 flex items-center border rounded-sm text-center">{quantity}</span>

                <button
                  onClick={() => handleUpdateQuantity('increase')}
                  className="flex items-center justify-center border h-10 w-10 rounded-sm"
                >
                  <Plus className="size-4.5" />
                </button>
              </div>
            </div>
            <div className="md:flex gap-3 items-center grid grid-cols-2 mb-6">
              <Button className="h-12 text-lg lg:w-3/4 md:w-4/7 w-full">Mua ngay</Button>
              <Button
                disabled={isPending}
                onClick={handleAddToCart}
                className="h-12 text-md w-full md:w-auto"
                variant="outline"
              >
                <ShoppingCart className="size-6" />
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-300 px-3 pt-3 pb-10 bg-white mx-auto mt-3">
        <p className="font-semibold text-xl">Mô tả sản phẩm</p>
        <div className="prose max-w-none">
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </div>
      </div>
      <EvaluateProduct />
    </>
  );
};

export default page;
