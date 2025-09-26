import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';

const LoadingListProducts = () => {
  return (
    <Card>
      <CardHeader className="px-3 lg:px-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Danh sách sản phẩm có trong hệ thống</CardTitle>
            <CardDescription className="mt-1">Những sản phẩm hiện có trong hệ thống</CardDescription>
          </div>
          <Button className="cursor-pointer ml-4">
            <Plus />
            <span className="md:block hidden">Thêm sản phẩm mới</span>
          </Button>
        </div>

        <Separator className="mt-4 mb-2" />

        <div className="flex items-center gap-1 md:gap-3">
          <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="lg:min-w-60 relative">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex flex-col w-full md:flex-row lg:justify-between md:gap-4">
            <div className="grid grid-cols-2 md:flex gap-4 flex-wrap">
              <div className="h-10 bg-gray-200 rounded w-32 md:w-40 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 md:w-40 animate-pulse"></div>
            </div>

            <div className="flex gap-4 flex-wrap mt-4 md:mt-0 justify-end">
              <div className="w-full md:w-auto">
                <div className="h-10 bg-gray-200 rounded md:min-w-35 w-full md:w-auto animate-pulse"></div>
              </div>
              <div className="w-full md:w-auto">
                <div className="h-10 bg-gray-200 rounded w-full lg:w-auto min-w-35 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="px-3 lg:px-4 pb-4">
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
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 items-center">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-15 md:w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 hidden md:block bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 hidden md:block bg-gray-200 rounded w-8 animate-pulse"></div>
                <div className="h-6 hidden md:block bg-gray-200 rounded-full w-16 animate-pulse"></div>
                <div className="h-4 hidden md:block bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LoadingListProducts;
