'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useUpdateCategory } from '@/hooks/categories';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/components/common/fieldOfForm/InputField';
import IconImageField from '@/components/common/fieldOfForm/FieldIconOfForm';
import { updateCategorySchema, UpdateCategorySchema } from '@/schemas/categories';
import { Category } from '@/types/categories';

type Props = {
  data: Category;
};

const UpdateCategoryForm = ({ data }: Props) => {
  const { mutate: updateCategoryMutate, isPending } = useUpdateCategory();

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
  });

  useEffect(() => {
    form.reset({
      id: data.id,
      name: data.name,
      icon: data.icon,
    });
  }, [data]);

  const onSubmit = (values: UpdateCategorySchema) => {
    updateCategoryMutate(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <InputField
                requireIcon
                label="Tên danh mục"
                field={field}
                disabled={isPending}
                placeholder="Nhập tên danh mục"
              />
            )}
          />

          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => <IconImageField disabled={isPending} field={field} />}
          />
        </div>

        <Button disabled={isPending} type="submit" className="w-full mt-2 md:w-auto">
          <Loader className={cn('animate-spin size-3.5', !isPending && 'hidden')} strokeWidth={3} />
          Cập nhật sản phẩm
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCategoryForm;
