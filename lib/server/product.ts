import { Category } from '@/types/categories';
import { NewProductsResponseType, TopSellResponseType } from '@/types/products';

export async function getTopSell(): Promise<TopSellResponseType> {
  const res = await fetch(`${process.env.API_URL}/orders/top-sell`, {
    next: { revalidate: 60 * 2 }, // ISR 120s
  });

  if (!res.ok) throw new Error('Failed to fetch top sell');

  return res.json();
}

export async function getNewProduct(): Promise<NewProductsResponseType> {
  const res = await fetch(`${process.env.API_URL}/product/new`, {
    next: { revalidate: 60 * 10 }, // ISR 600s
  });

  if (!res.ok) throw new Error('Failed to fetch new product');

  return res.json();
}

export async function getDiscountProducts(): Promise<NewProductsResponseType> {
  const res = await fetch(`${process.env.API_URL}/product/discount`, {
    next: { revalidate: 60 * 5 }, // ISR 300s
  });

  if (!res.ok) throw new Error('Failed to fetch discount product');

  return res.json();
}

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.API_URL}/category/all`, {
    next: {
      revalidate: 60 * 60 * 12, // 12h
      tags: ['categories'],
    },
  });

  if (!res.ok) throw new Error('Failed to fetch all category');
  return res.json();
}
