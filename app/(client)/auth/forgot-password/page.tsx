'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';
import { Loader, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/components/common/fieldOfForm/InputField';

import { useForgotPassword } from '@/hooks/api/auth';
import { formforgotPasswordSchema, FormForgotPasswordType } from '@/schemas/auth';

import successAnimation from '@/public/icons/success.json';

export default function page() {
  const { mutate: forgotPasswordMutate, isPending, isSuccess } = useForgotPassword();

  const form = useForm<FormForgotPasswordType>({
    resolver: zodResolver(formforgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: FormForgotPasswordType) {
    forgotPasswordMutate(values);
  }

  return (
    <div className="py-10">
      <div className="mx-auto max-w-300 px-2">
        <div className="flex flex-col items-center gap-2">
          <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full ">
            <Image src={'/icons/logo-small.svg'} width={40} height={40} alt="Logo ecomshop small" className="w-10" />
          </div>
          <div>
            <p className="text-center font-semibold">Lấy lại mật khẩu</p>
            <p className="text-center">Nhập thông tin tài khoản để lấy lại mật khẩu.</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="max-w-lg mx-auto">
            <Lottie animationData={successAnimation} loop={false} autoPlay className="w-20 h-20 mx-auto my-3" />
            <p className="text-center">Kiểm tra email để lấy lại mật khẩu.</p>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-3 max-w-lg mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <InputField className="h-10" field={field} label="Tài khoản" placeholder="Email@ecomshop.site" />
                )}
              />

              <div className="flex items-center justify-center pt-4">
                <Button disabled={isPending} className="w-full" type="submit" size="lg">
                  <Loader className={cn('animate-spin', !isPending && 'hidden')} />
                  <LogIn className={cn(isPending && 'hidden')} />
                  {isPending ? 'Đang gửi yêu cầu' : 'Lấy lại mật khẩu'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
