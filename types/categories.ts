type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

type Entity<K extends string> = {
  [P in K]: string;
} & {
  name: string;
};

export type CategoriesAndBrandsResponse<K extends string> = {
  categories: Entity<K>[];
  brands: Entity<K>[];
};
