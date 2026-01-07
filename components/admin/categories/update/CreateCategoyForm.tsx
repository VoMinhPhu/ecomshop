'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useCreateCategory } from '@/hooks/categories';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/components/common/fieldOfForm/InputField';
import IconImageField from '@/components/common/fieldOfForm/FieldIconOfForm';
import { createCategorySchema, CreateCategorySchema } from '@/schemas/categories';

const CreateCategoyForm = () => {
  const { mutate: createCategoryMutate, isPending } = useCreateCategory();

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      icon: undefined,
    },
  });
  const onSubmit = (values: CreateCategorySchema) => {
    createCategoryMutate(values);
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
          Thêm danh mục
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategoyForm;
