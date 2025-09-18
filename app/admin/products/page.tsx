import Link from 'next/link';

import { Download, Plus, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const Page = () => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách sản phẩm có trong hệ thống</CardTitle>
              <CardDescription className="mt-1">Những sản phẩm hiện có trong hệ thống</CardDescription>
            </div>
            <Link href={'/admin/products/create'}>
              <Button className="cursor-pointer ml-4">
                <Plus />
                <span className="md:block hidden">Thêm sản phẩm mới</span>
              </Button>
            </Link>
          </div>
          <Separator className="mt-4 mb-2" />
          <div className="flex items-center gap-1 md:gap-3">
            <p className="font-semibold text-sm">
              Tất cả (<span className=" hover:underline mx-0.5 font-normal">100</span>)
            </p>
            <p className="font-semibold text-sm">
              Còn hàng (<span className="hover:underline mx-0.5 font-normal">89</span>)
            </p>
            <p className="font-semibold text-sm">
              Hết hàng (<span className="hover:underline mx-0.5 font-normal">11</span>)
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="lg:w-70 relative">
              <Search size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm kiếm sản phẩm..." className="pl-8" />
            </div>
            <div className="md:flex gap-4">
              <div className="flex justify-between md:gap-4">
                <Select>
                  <SelectTrigger className="w-34 md:w-35 rounded-sm sm:flex" aria-label="Select a value">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm max-w-70">
                    <SelectItem value="Điện tử" className="rounded-sm">
                      Điện tử
                    </SelectItem>
                    <SelectItem value="Công nghệ" className="rounded-sm">
                      Công nghệ
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-34 md:w-35 rounded-sm sm:flex" aria-label="Select a value">
                    <SelectValue placeholder="Hãng" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm max-w-70">
                    <SelectItem value="Samsung" className="rounded-sm">
                      Samsung
                    </SelectItem>
                    <SelectItem value="Apple" className="rounded-sm">
                      Apple
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="mt-4 md:mt-0 w-full md:w-auto">
                <Download />
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Page;
