import { AddedProduct, Product } from '@/typespaces/interfaces/product.interface';

export interface State {
  products: Product[];
  addedProducts: AddedProduct[];
}

export const state: State = {
  products: [],
  addedProducts: [],
};
