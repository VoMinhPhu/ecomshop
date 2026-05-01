import { fetchProductWithFilter } from '@/lib/server/product.server';
import { ProductFilterParams } from '@/types/products.type';
import ListProducts from './ListProducts';

interface Props {
  params: ProductFilterParams;
}

const ListProductsWrapper = async ({ params }: Props) => {
  const data = await fetchProductWithFilter(params);

  return <ListProducts data={data} totalPages={data.totalPages} />;
};

export default ListProductsWrapper;
