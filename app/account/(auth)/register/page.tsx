'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import FormRegister from '@/components/auth/FormRegister';

const page = () => {
  return (
    <div className="mt-38 md:mt-48 lg:mt-31 px-2">
      <div className="max-w-300 w-full mx-auto">
        <div className="flex gap-2 pt-2 text-sm">
          <span className="text-zinc-400">Trang chủ</span>
          <span>/</span>
          <span className="">Đăng ký tài khoản</span>
        </div>

        <div className="pt-10">
          <p className="text-center uppercase text-2xl">Đăng ký tài khoản</p>
          <p className="text-center">
            Bạn đã có tài khoản?
            <Link href={'/account/login'} className="text-primary ml-2 underline font-medium">
              Đăng nhập tại đây.
            </Link>
          </p>
        </div>
        <div className="md:w-4/5 lg:w-3/7 mx-auto">
          <FormRegister />

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
