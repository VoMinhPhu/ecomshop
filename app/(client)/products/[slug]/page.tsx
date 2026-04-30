import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

import RenderImages from '@/components/products/slug/RenderImages';
import EvaluateProduct from '@/components/products/slug/comment/EvaluateProduct';
import RenderDynamicProduct from '@/components/products/slug/RenderDynamicProduct';

import { getStaticProductInfo } from '@/lib/server/product.server';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const data = await getStaticProductInfo(slug as string);

  if (!data) return notFound();

  return (
    <>
      <div className="max-w-300 mx-auto flex items-center gap-2 text-zinc-500 mb-2">
        <Link href={'/'}>Trang chủ</Link>
        <span>&gt;</span>
        <Link href={'/products'}>Sản phẩm</Link>
      </div>
      <div className="lg:max-w-300 bg-white mx-auto md:grid grid-cols-2 rounded-sm">
        <RenderImages images={data.images} name={data.name} />
        <div className="flex-1 pt-6 px-8 pb-4 relative">
          <h1 className="font-semibold text-xl h-14 line-clamp-2">{data.name}</h1>
          <h2>
            Thương hiệu: <span className="text-blue-500">{data.brand.name}</span>
          </h2>
          <RenderDynamicProduct productId={data.id} />
        </div>
      </div>
      <div className="max-w-300 px-3 pt-3 pb-10 bg-white mx-auto mt-3 rounded-sm">
        <h2 className="font-semibold text-xl">Mô tả sản phẩm</h2>
        <div className="prose max-w-none">
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </div>
      </div>
      <EvaluateProduct productId={data.id} />
    </>
  );
}
