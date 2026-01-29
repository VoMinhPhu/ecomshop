import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { LogInIcon } from 'lucide-react';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '@/components/ui/dialog';

export default function AuthPopup() {
  const [open, setOpen] = useState(false);
  const [tabLogin, setTabLogin] = useState<boolean>(true);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="outline" size={'lg'}>
          <LogInIcon />
          Đăng nhập
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <div className="fixed inset-0 bg-black/40 z-50" />

        <DialogContent>
          {tabLogin ? <LoginSection closeDialogFn={setOpen} /> : <RegisterSection closeDialogFn={setOpen} />}
          <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            <span className="text-muted-foreground text-xs">Hoặc</span>
          </div>

          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
            <Button variant="outline" className="w-full" size="lg">
              <Image src={'/icons/google.svg'} width={16} height={16} alt="google icon" />
              Đăng nhập bằng Google
            </Button>
          </Link>
          <div className="text-sm text-center">
            <p>
              Bạn {tabLogin ? 'chưa' : 'đã'} có tài khoản?
              <button onClick={() => setTabLogin(!tabLogin)} className="text-primary ml-1 font-semibold cursor-pointer">
                {tabLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
              </button>
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
