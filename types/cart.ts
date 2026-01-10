export type CartItem = {
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

export type CartUIState = {
  quantity: number;
  selected: boolean;
};
