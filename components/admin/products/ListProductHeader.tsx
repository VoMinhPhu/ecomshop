'use client';

import Link from 'next/link';
import { VisibilityState } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import { Columns3, Download, Plus, Search } from 'lucide-react';

import { columnsOfListProduct } from './columnsOfListProduct';

interface Props {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  columnVisibility: VisibilityState;
  setColumnVisibility: (updater: React.SetStateAction<VisibilityState>) => void;
  categoryAndBrands: any;
}

export default function ListProductHeader({
  nameFilter,
  setNameFilter,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  columnVisibility,
  setColumnVisibility,
  categoryAndBrands,
}: Props) {
  const hideableColumns = columnsOfListProduct.filter((c) => c.enableHiding !== false);
  return (
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

      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="lg:min-w-60 relative">
          <Search size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Tìm kiếm tên sản phẩm"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full md:flex-row lg:justify-between md:gap-4">
          <div className="grid grid-cols-2 md:flex gap-4 flex-wrap">
            <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v === 'all' ? '' : v)}>
              <SelectTrigger className="w-auto min-w-32 md:max-w-40 rounded-sm sm:flex">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {categoryAndBrands.categories.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={(v) => setSelectedBrand(v === 'all' ? '' : v)}>
              <SelectTrigger className="w-auto min-w-32 md:max-w-40 rounded-sm sm:flex">
                <SelectValue placeholder="Thương hiệu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {categoryAndBrands.brands.map((b: any) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 flex-wrap justify-end">
            <div className="w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="md:min-w-35 w-full md:w-auto" variant="outline">
                    <Columns3 />
                    Hiển thị
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  {hideableColumns.map((col) => {
                    const key = 'accessorKey' in col ? String(col.accessorKey) : String(col.id);
                    return (
                      <DropdownMenuItem className="p-0" key={key}>
                        <Label htmlFor={key} className="flex w-full p-2 items-center gap-2">
                          <Checkbox
                            id={key}
                            checked={columnVisibility[key] ?? true}
                            onCheckedChange={(checked) => setColumnVisibility((old) => ({ ...old, [key]: !!checked }))}
                          />
                          {col.meta?.title ?? key}
                        </Label>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full md:w-auto">
              <Button className="w-full lg:w-auto min-w-35">
                <Download />
                Xuất Excel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
