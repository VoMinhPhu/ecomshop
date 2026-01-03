'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

import { useUpdateProduct } from '@/hooks/products';

import { CategoriesAndBrandsResponse } from '@/types/categories';
import { Product, updateProductSchema, UpdateProductSchema } from '@/types/products';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/components/common/fieldOfForm/InputField';
import SelectField from '@/components/common/fieldOfForm/SelectField';
import MarkdownField from '@/components/admin/products/MarkdownField';
import CropImageField from '@/components/admin/products/CropImageField';
import SelectHaveSearchField from '@/components/common/fieldOfForm/SelectHaveSearchField';

type Props = {
  categoriesAndBrands: CategoriesAndBrandsResponse<'id'>;
  data: Product;
};

const UpdateProductForm = ({ categoriesAndBrands, data }: Props) => {
  const { mutate: updateProductMutate, isPending } = useUpdateProduct();

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      price: `${data.price}`,
      salePrice: data.salePrice ? `${data.salePrice}` : undefined,
      description: data.description,
      categoryId: data.categoryId,
      brandId: data.brandId,
      status: data.status,
      thumbnail: data.thumbnail,
    },
  });

  const onSubmit = (values: UpdateProductSchema) => {
    updateProductMutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <InputField
              requireIcon
              label="Tên sản phẩm"
              field={field}
              disabled={isPending}
              placeholder="Nhập tên sản phẩm"
            />
          )}
        />

        <FormField
          name="thumbnail"
          control={form.control}
          render={({ field }) => <CropImageField disabled={isPending} field={field} />}
        />

        <div className="grid md:grid-cols-2 gap-y-4 md:gap-2">
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <SelectHaveSearchField
                nameField="Danh mục"
                requireIcon
                disabled={isPending}
                value={field.value}
                options={(categoriesAndBrands?.categories ?? []).map((c) => ({ value: c.id, label: c.name }))}
                onSelect={field.onChange}
              />
            )}
          />
          <FormField
            name="brandId"
            control={form.control}
            render={({ field }) => (
              <SelectHaveSearchField
                nameField="Thương hiệu"
                requireIcon
                disabled={isPending}
                value={field.value}
                options={(categoriesAndBrands?.brands ?? []).map((b) => ({ value: b.id, label: b.name }))}
                onSelect={field.onChange}
              />
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-y-4 md:gap-2 items-start">
          <FormField
            name="price"
            control={form.control}
            disabled={isPending}
            render={({ field }) => <InputField requireIcon label="Giá" field={field} placeholder="Nhập giá sản phẩm" />}
          />
          <FormField
            name="salePrice"
            control={form.control}
            disabled={isPending}
            render={({ field }) => (
              <InputField label="Giá khuyến mãi" field={field} placeholder="Nhập giá khuyến mãi (nếu có)" />
            )}
          />
        </div>

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <MarkdownField requireIcon field={field} label="Mô tả sản phẩm" disabled={isPending} />
          )}
        />

        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <SelectField
              label="Trạng thái"
              field={field}
              disabled={isPending}
              options={[
                { value: 'active', label: 'Đang bán' },
                { value: 'inactive', label: 'Ngừng bán' },
              ]}
            />
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full mt-2 md:w-auto">
          <Loader className={cn('animate-spin size-3.5', !isPending && 'hidden')} strokeWidth={3} />
          Cập nhật sản phẩm
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProductForm;
