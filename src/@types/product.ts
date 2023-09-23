export type Products = Array<Product>;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  heroImage: string;
  images: Array<string>;
  variations: Array<ProductVariation>;
};

export type ProductVariation = {
  id: string;
  name: string;
  price: number;
};
