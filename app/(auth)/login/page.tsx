'use client';

import Link from 'next/link';
import Image from 'next/image';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { useLogin } from '@/lib/api/auth';

import { LoaderIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/auth/PasswordInput';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formLoginSchema = z.object({
  email: z.email('Vui lòng nhập địa chỉ email hợp lệ.'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu.').max(50),
});

const page = () => {
  const { mutate: loginMutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formLoginSchema>) {
    loginMutate(values);
    form.reset();
  }
  return (
    <div className="mt-38 md:mt-48 lg:mt-31 px-2">
      <div className="max-w-300 w-full mx-auto">
        <div className="flex gap-2 pt-2 text-sm">
          <span className="text-zinc-400">Trang chủ</span>
          <span>/</span>
          <span className="">Đăng nhập tài khoản</span>
        </div>
        <div className="pt-10">
          <p className="text-center uppercase text-2xl">Đăng nhập tài khoản</p>
          <p className="text-center">
            Bạn chưa có tài khoản?
            <Link href={'/register'} className="text-primary ml-2 underline font-medium">
              Đăng kí tại đây.
            </Link>
          </p>
        </div>
        <div className="md:w-4/5 lg:w-3/7 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
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
              <p className="lg:my-2 my-4">
                Quên mật khẩu ?
                <Link href={'/account/forgot-password'} className="text-primary ml-2 underline">
                  Lấy lại mật khẩu.
                </Link>
              </p>
              <Button type="submit" className="w-full h-11 text-base">
                <span className={cn('items-center animate-spin', isPending ? 'flex' : 'hidden')}>
                  <LoaderIcon strokeWidth={3} />
                </span>
                Đăng nhập
              </Button>
            </form>
          </Form>
          <p className="text-center text-zinc-400 my-4">Hoặc đăng nhập bằng</p>
          <Button variant="outline" className="w-full h-11 text-base">
            <Image src={'/google.svg'} width={20} height={20} alt="google icon" />
            Đăng nhập với Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
