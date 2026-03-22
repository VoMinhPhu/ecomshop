'use client';

import { useParams } from 'next/navigation';

import { useGetBrandById } from '@/hooks/api/brands';

import ProductNotFound from '@/components/admin/products/ProductNotFound';
import UpdateBrandForm from '@/components/admin/brands/update/UpdateBrandForm';
import LoadingUpdateCategory from '@/components/admin/categories/update/LoadingUpdateCategory';

import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Page = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isLoading } = useGetBrandById(id);

  if (isLoading) return <LoadingUpdateCategory />;

  if (!data) return <ProductNotFound />;

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Chỉnh sửa danh mục</CardTitle>
        <CardDescription>Thêm, sửa, xóa danh mục sản phẩm</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <UpdateBrandForm data={data} />
      </CardContent>
    </Card>
  );
};

export default Page;
