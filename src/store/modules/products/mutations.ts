import { MutationTree } from 'vuex';
import { ProductResponse } from '@/typespaces/interfaces/product.interface';
import { AddProduct } from '@/typespaces/types/create-order.type';
import { State } from './state';
import { ProductsMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [ProductsMutationTypes.FETCH_PRODUCTS](state: S, payload: ProductResponse): void;
  [ProductsMutationTypes.ADD_PRODUCT](state: S, payload: AddProduct): void;
  [ProductsMutationTypes.CLEAR_ADDED_PRODUCTS](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [ProductsMutationTypes.FETCH_PRODUCTS](state: State, payload: ProductResponse) {
    state.products = payload.products;
  },

  [ProductsMutationTypes.ADD_PRODUCT](state: State, payload: AddProduct) {
    const findProduct = state.addedProducts.find((item) => item.id === payload.product.id);
    if (findProduct) {
      state.addedProducts = state.addedProducts.map((item) => {
        if (item.id === findProduct.id) {
          return { ...item, quantity: item.quantity + payload.quantity };
        }
        return item;
      });
    } else {
      state.addedProducts.push({ ...payload.product, quantity: payload.quantity });
    }
  },
  [ProductsMutationTypes.CLEAR_ADDED_PRODUCTS](state: State) {
    state.addedProducts = [];
  },
};
