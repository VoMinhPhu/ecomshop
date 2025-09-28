import { Separator } from '@/components/ui/separator';
import CreateProductForm from '@/components/admin/products/CreateProductForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Page = () => {
  return (
    <Card className="m-2 md:m-4">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Thêm sản phẩm mới</CardTitle>
        <CardDescription>Thêm sản phẩm mới cho hệ thống</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 md:px-6">
        <CreateProductForm />
      </CardContent>
    </Card>
  );
};

export default Page;
