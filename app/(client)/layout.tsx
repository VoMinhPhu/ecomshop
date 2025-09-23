import type { Metadata } from 'next';

import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';

export const metadata: Metadata = {
  title: 'E-com Store',
  description:
    'Cửa hàng thương mại điện tử chuyên cung cấp sản phẩm chất lượng – thời trang, điện tử, gia dụng với giá tốt, giao hàng toàn quốc.',
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mt-38.25 md:mt-48 lg:mt-31">{children}</main>
      <Footer />
    </>
  );
}
