'use client';

import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1>Chi tiết sản phẩm: {id}</h1>
    </div>
  );
}
