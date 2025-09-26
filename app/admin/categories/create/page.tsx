import { Separator } from '@/components/ui/separator';
import CreateCategoyForm from '@/components/admin/categories/update/CreateCategoyForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Thêm danh mục mới</CardTitle>
        <CardDescription>Thêm danh mục mới cho hệ thống</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <CreateCategoyForm />
      </CardContent>
    </Card>
  );
};

export default page;
