import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileSearch2Icon, ShoppingBagIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-accent py-6">
      <div className="bg-white rounded-sm max-w-300 flex flex-col items-center justify-center mx-auto py-8">
        <FileSearch2Icon className="md:size-30 size-25 text-zinc-400" strokeWidth={1.5} />
        <h2 className="text-2xl">404</h2>
        <p>Không tìm thấy trang bạn tìm kiếm</p>
        <Link href="/products" className="mt-3">
          <Button variant="outline">
            <ShoppingBagIcon />
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    </div>
  );
}
