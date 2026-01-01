import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-com Store - Products',
  description:
    'Cửa hàng thương mại điện tử chuyên cung cấp sản phẩm chất lượng – thời trang, điện tử, gia dụng với giá tốt, giao hàng toàn quốc.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-zinc-100 pt-5 pb-10 min-h-[calc(100vh-400px)]">{children}</div>;
}
