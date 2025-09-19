import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

const LoadingListProducts = () => {
  return (
    <Card className="m-4 p-5">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Danh sách sản phẩm có trong hệ thống</CardTitle>
            <CardDescription className="mt-1">Những sản phẩm hiện có trong hệ thống</CardDescription>
          </div>
          <div className="bg-primary rounded-sm">
            <Button className="cursor-pointer">
              <Plus />
              <span className="md:block hidden">Thêm sản phẩm mới</span>
            </Button>
          </div>
        </div>

        <Separator className="mt-6" />

        <div className="flex gap-4 my-3">
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-green-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="border-b bg-gray-50 p-4">
            <div className="grid grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {[...Array(8)].map((_, index) => (
            <div key={index} className="border-b last:border-b-0 p-4">
              <div className="grid grid-cols-8 gap-4 items-center">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LoadingListProducts;
