import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { AddedProduct, Product } from '@/typespaces/interfaces/product.interface';
import { State } from './state';

export type Getters = {
  getProducts(state: State): Product[];
  getAddedProducts(state: State): AddedProduct[];
  getTotal(state: State): number;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getProducts: (state: State) => state.products,
  getAddedProducts: (state: State) => state.addedProducts,
  getTotal: (state: State) =>
    state.addedProducts.reduce((acc, product) => {
      // eslint-disable-next-line
      acc += product.quantity * product.price;
      return acc;
    }, 0),
};
