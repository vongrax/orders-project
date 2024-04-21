import { Product } from '@/typespaces/interfaces/product.interface';

export type AddProduct = {
  product: Product;
  quantity: number;
};

export type CreateOrder = {
  product_id: number;
  quantity: number;
};
