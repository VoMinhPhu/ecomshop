'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { useRegister } from '@/lib/api/auth';

import { LoaderIcon } from 'lucide-react';
import PasswordInput from './PasswordInput';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formRegiterSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập họ và tên.').max(50),
    email: z.email('Vui lòng nhập địa chỉ email hợp lệ.'),
    password: z
      .string()
      .min(6, 'Mật khẩu ít nhất phải 6 kí tự.')
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
        'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp.',
    path: ['confirmPassword'],
  });

const FormRegister = () => {
  const { mutate: registerMutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof formRegiterSchema>>({
    resolver: zodResolver(formRegiterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formRegiterSchema>) {
    const { confirmPassword, ...data } = values;
    registerMutate(data);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                Tên người dùng
                <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Nhập tên của bạn ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                Tài khoản
                <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Nhập địa chỉ email của bạn ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <PasswordInput field={field} label="Mật khẩu" />}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => <PasswordInput field={field} label="Nhập lại mật khẩu" />}
        />

        <Button type="submit" className="w-full h-11 text-base mt-6">
          <span className={cn('items-center animate-spin', isPending ? 'flex' : 'hidden')}>
            <LoaderIcon strokeWidth={3} />
          </span>
          Đăng Ký
        </Button>
      </form>
    </Form>
  );
};

export default FormRegister;
