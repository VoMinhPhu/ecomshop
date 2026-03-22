'use client';

import { useParams } from 'next/navigation';
import { useGetCategoriesAndBrands, useGetProductById } from '@/hooks/api/products';

import { Separator } from '@/components/ui/separator';
import ProductNotFound from '@/components/admin/products/ProductNotFound';
import LoadingUpdate from '@/components/admin/products/update/LoadingUpdate';
import UpdateProductForm from '@/components/admin/products/update/UpdateProductForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: categoriesAndBrands } = useGetCategoriesAndBrands();
  const { data, isLoading } = useGetProductById(id);

  if (isLoading || !categoriesAndBrands) return <LoadingUpdate />;
  if (!data) return <ProductNotFound />;

  return (
    <Card className="m-2 lg:m-4">
      <CardHeader className="px-4 lg:px-6">
        <CardTitle>Cập nhật sản phẩm</CardTitle>
        <CardDescription>Cập nhật thông tin cho sản phẩm.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 lg:px-6">
        <UpdateProductForm categoriesAndBrands={categoriesAndBrands} data={data} />
      </CardContent>
    </Card>
  );
}
