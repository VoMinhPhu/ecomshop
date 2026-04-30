'use client';

import { useParams } from 'next/navigation';

import { useGetCategoryById } from '@/hooks/api/categories.hook';

import ProductNotFound from '@/components/admin/products/ProductNotFound';
import UpdateCategoryForm from '@/components/admin/categories/update/UpdateCategoryForm';

import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingUpdateCategory from '@/components/admin/categories/update/LoadingUpdateCategory';

const Page = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isLoading } = useGetCategoryById(id);

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
        <UpdateCategoryForm data={data} />
      </CardContent>
    </Card>
  );
};

export default Page;
