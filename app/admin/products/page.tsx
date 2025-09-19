'use client';

import { useEffect, useState } from 'react';

import { Product } from '@/types/products';

import { Card, CardContent } from '@/components/ui/card';

import { columnsOfListProduct } from '@/components/admin/products/list-product/columnsOfListProduct';
import LoadingListProducts from '@/components/admin/products/list-product/LoadingListProducts';
import ListProductHeader from '@/components/admin/products/list-product/ListProductHeader';
import { DataTable } from '@/components/admin/products/list-product/ListProductData';

import { useGetAllProduct, useGetCategoriesAndBrands } from '@/hooks/products';

import useProductPagination from '@/stores/productStore';

const Page = () => {
  const { setTotalPages } = useProductPagination();
  const { data, isLoading } = useGetAllProduct();
  const { data: CategoryAndBrands } = useGetCategoriesAndBrands();

  const [nameFilter, setNameFilter] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data, setTotalPages]);

  if (isLoading || !data || !CategoryAndBrands) return <LoadingListProducts />;

  const products = data.data ?? [];

  const filteredData = products.filter(
    (d: Product) =>
      d.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (selectedBrand === '' || d.brandId === selectedBrand) &&
      (selectedCategory === '' || d.categoryId === selectedCategory),
  );

  return (
    <div className="p-4">
      <Card>
        <ListProductHeader
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          categoryAndBrands={CategoryAndBrands}
        />
        <CardContent>
          <div className="grid grid-cols-1">
            <DataTable
              columns={columnsOfListProduct}
              data={filteredData}
              columnVisibility={columnVisibility}
              onColumnVisibilityChange={(updater: React.SetStateAction<Record<string, boolean>>) =>
                setColumnVisibility(updater)
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
