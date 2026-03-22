'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProduct, useGetCategoriesAndBrands } from '@/hooks/api/products';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

import UploadImages from './UploadImages';
import MarkdownField from './MarkdownField';

import InputField from '@/components/common/fieldOfForm/InputField';
import SelectField from '@/components/common/fieldOfForm/SelectField';
import SelectHaveSearchField from '@/components/common/fieldOfForm/SelectHaveSearchField';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';

import { createProductSchema, CreateProductSchema } from '@/schemas/products';

const CreateProductForm = () => {
  const { data } = useGetCategoriesAndBrands();
  const { mutate: createProductMutate, isPending } = useCreateProduct();

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      price: '',
      salePrice: undefined,
      description: undefined,
      stock: '0',
      categoryId: '',
      brandId: '',
      status: 'active',
      images: undefined,
    },
  });

  const onSubmit = (values: CreateProductSchema) => {
    createProductMutate(values, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <InputField requireIcon label="Tên sản phẩm" field={field} placeholder="Nhập tên sản phẩm" />
          )}
        />

        <FormField name="images" control={form.control} render={({ field }) => <UploadImages field={field} />} />

        <div className="grid md:grid-cols-2 gap-y-4 md:gap-2">
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <SelectHaveSearchField
                nameField="Danh mục"
                requireIcon
                field={field}
                options={(data?.categories ?? []).map((c) => ({ value: c.id, label: c.name }))}
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
                field={field}
                options={(data?.brands ?? []).map((b) => ({ value: b.id, label: b.name }))}
              />
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-y-4 md:gap-2 items-start">
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => <InputField requireIcon label="Giá" field={field} placeholder="Nhập giá sản phẩm" />}
          />
          <FormField
            name="salePrice"
            control={form.control}
            render={({ field }) => (
              <InputField label="Giá khuyến mãi" field={field} placeholder="Nhập giá khuyến mãi (nếu có)" />
            )}
          />
        </div>
        <FormField
          name="stock"
          control={form.control}
          render={({ field }) => (
            <InputField requireIcon label="Số lượng" field={field} placeholder="Nhập số lượng sản phẩm" type="number" />
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => <MarkdownField requireIcon field={field} label="Mô tả sản phẩm" />}
        />

        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <SelectField
              label="Trạng thái"
              field={field}
              options={[
                { value: 'active', label: 'Đang bán' },
                { value: 'inactive', label: 'Ngừng bán' },
              ]}
            />
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full mt-2 md:w-auto">
          <Loader className={cn('animate-spin size-3.5', !isPending && 'hidden')} strokeWidth={3} />
          Tạo sản phẩm
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
