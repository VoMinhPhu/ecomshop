import { Separator } from '@/components/ui/separator';
import CreateBrandForm from '@/components/admin/brands/update/createBrandForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
  return (
    <Card className="m-2 md:m-4">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Thêm thương hiệu mới</CardTitle>
        <CardDescription>Thêm thương hiệu mới cho hệ thống</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 md:px-6">
        <CreateBrandForm />
      </CardContent>
    </Card>
  );
};

export default page;
