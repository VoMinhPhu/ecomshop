'use client';

import { useForm } from 'react-hook-form';
import { useCreateBrand } from '@/hooks/brands';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/components/common/fieldOfForm/InputField';
import IconImageField from '@/components/common/fieldOfForm/FieldIconOfForm';
import { createBrandSchema, CreateBrandSchema } from '@/schemas/brands';

const CreateBrandForm = () => {
  const { mutate: createBrandMutate, isPending } = useCreateBrand();

  const form = useForm<CreateBrandSchema>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: '',
      icon: undefined,
    },
  });
  const onSubmit = (values: CreateBrandSchema) => {
    createBrandMutate(values);
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
                label="Tên thương hiệu"
                field={field}
                disabled={isPending}
                placeholder="Nhập tên thương hiệu"
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
          Thêm thương hiệu
        </Button>
      </form>
    </Form>
  );
};

export default CreateBrandForm;
