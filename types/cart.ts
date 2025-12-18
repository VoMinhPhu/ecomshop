type CartItem = {
  id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    salePrice: number | null;
    thumbnail: string;
    slug: string;
  };
};
