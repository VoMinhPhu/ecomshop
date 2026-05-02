import type { Metadata } from 'next';

import { cookies } from 'next/headers';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import ChatProvider from '@/components/chat/ChatProvider';
import NavBottomOnMobile from '@/components/common/nav/NavBottomOnMobile';

import { getAllCategories } from '@/lib/server/product.server';

export const metadata: Metadata = {
  title: 'Ecomshop',
  description:
    'Cửa hàng thương mại điện tử chuyên cung cấp sản phẩm chất lượng – thời trang, điện tử, gia dụng với giá tốt, giao hàng toàn quốc.',
};

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLogin = cookieStore.get('refresh_token');
  const categories = await getAllCategories();

  return (
    <>
      <Header />
      <main className="md:mt-36 lg:mt-20">{children}</main>
      <Footer />
      <NavBottomOnMobile categories={categories} />
      <ChatProvider isLogin={!!isLogin} />
    </>
  );
}
