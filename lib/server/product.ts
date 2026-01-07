import { Category } from '@/types/categories';
import { GetProductBySlugResponse, NewProductsResponseType, TopSellResponseType } from '@/types/products';

export async function getTopSell(): Promise<TopSellResponseType> {
  try {
    const res = await fetch(`${process.env.API_URL}/orders/top-sell`, {
      next: { revalidate: 60 * 2 },
    });
    if (!res.ok) throw new Error('Failed to fetch top sell');
    return res.json();
  } catch (err) {
    console.warn('Fetch top sell failed:', err);
    return [];
  }
}

export async function getNewProduct(): Promise<NewProductsResponseType> {
  try {
    const res = await fetch(`${process.env.API_URL}/product/new`, {
      next: { revalidate: 60 * 10 },
    });
    if (!res.ok) throw new Error('Failed to fetch new product');
    return res.json();
  } catch (err) {
    console.warn('Fetch new product failed:', err);
    return [];
  }
}

export async function getDiscountProducts(): Promise<NewProductsResponseType> {
  try {
    const res = await fetch(`${process.env.API_URL}/product/discount`, {
      next: { revalidate: 60 * 5 },
    });
    if (!res.ok) throw new Error('Failed to fetch discount product');
    return res.json();
  } catch (err) {
    console.warn('Fetch discount product failed:', err);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/category/all`, {
      next: { revalidate: 60 * 60 * 12, tags: ['categories'] },
    });
    if (!res.ok) throw new Error('Failed to fetch all category');
    return res.json();
  } catch (err) {
    console.warn('Fetch categories failed:', err);
    return [];
  }
}

export async function getStaticProductInfo(slug: string): Promise<GetProductBySlugResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/product/${slug}`, {
      next: { revalidate: 60 * 5 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.warn('Fetch static product infomation failed:', err);
    return null;
  }
}
