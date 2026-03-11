'use client';

import Link from 'next/link';
import Image from 'next/image';

import { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader, LogIn } from 'lucide-react';

import { Button } from '../ui/button';
import { Form, FormField } from '../ui/form';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

import PasswordInput from './PasswordInput';
import InputField from '../common/fieldOfForm/InputField';

import { cn } from '@/lib/utils';
import { useLogin } from '@/hooks/api/auth';
import { formLoginSchema, FormLoginType } from '@/schemas/auth';

type Props = {
  closeDialogFn: React.Dispatch<SetStateAction<boolean>>;
};

export default function LoginSection({ closeDialogFn }: Props) {
  const { mutate: loginMutate, isPending } = useLogin();

  const form = useForm<FormLoginType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: FormLoginType) {
    loginMutate(values, {
      onSuccess: () => {
        form.reset();
        closeDialogFn(false);
      },
    });
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full ">
          <Image src={'/icons/logo-small.svg'} width={36} height={36} alt="Logo ecomshop small" className="w-9" />
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">Chào mừng bạn</DialogTitle>
          <DialogDescription className="sm:text-center">
            Nhập thông tin tài khoản, mật khẩu để đăng nhập.
          </DialogDescription>
        </DialogHeader>
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputField className="h-10" field={field} label="Tài khoản" placeholder="Email@ecomshop.site" />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput className="h-10" placeholder="Nhập mật khẩu" field={field} label="Mật khẩu" />
            )}
          />
          <div className="flex justify-end gap-2">
            <Link
              onClick={() => closeDialogFn(false)}
              className="text-sm underline hover:no-underline"
              href="/auth/forgot-password"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Button disabled={isPending} className="w-full" type="submit" size="lg">
            <Loader className={cn('animate-spin', !isPending && 'hidden')} />
            <LogIn className={cn(isPending && 'hidden')} />
            {isPending ? 'Đang đăng nhập' : 'Đăng nhập'}
          </Button>
        </form>
      </Form>
    </>
  );
}
