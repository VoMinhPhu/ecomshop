'use client';

import dynamic from 'next/dynamic';
import { Category } from '@/types/categories.type';

const NavBottomOnMobile = dynamic(() => import('./NavBottomOnMobile'), {
  ssr: false,
});

type Props = {
  categories?: Category[];
};

export default function NavBottomOnMobileLoader({ categories }: Props) {
  return <NavBottomOnMobile categories={categories} />;
}
