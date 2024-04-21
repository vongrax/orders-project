import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import OrderClient from '@/api/order.api';
import ProductsClient from '@/api/products.api';
import { AddProduct, CreateOrder } from '@/typespaces/types/create-order.type';
import { State } from './state';
import { Mutations } from './mutations';
import { ProductsMutationTypes } from './mutation-types';
import { ProductsActionTypes } from './action-types';

const orderClient = new OrderClient();
const productsClient = new ProductsClient();

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ProductsActionTypes.FETCH_PRODUCTS]({ commit }: AugmentedActionContext): void;

  [ProductsActionTypes.ADD_PRODUCT]({ commit }: AugmentedActionContext, payload: AddProduct): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ProductsActionTypes.FETCH_PRODUCTS]({ commit }) {
    try {
      const response = await productsClient.fetchProducts();
      commit(ProductsMutationTypes.FETCH_PRODUCTS, response);
    } catch (err) {
      throw new Error(err as string);
    }
  },

  async [ProductsActionTypes.ADD_PRODUCT]({ commit }, payload: AddProduct) {
    commit(ProductsMutationTypes.ADD_PRODUCT, payload);
  },

  async [ProductsActionTypes.CREATE_ORDER]({ commit }, payload: CreateOrder[]) {
    try {
      const response = await orderClient.createOrder(payload);
      if (response.success) {
        commit(ProductsMutationTypes.CLEAR_ADDED_PRODUCTS);
      }
      return response;
    } catch (err) {
      throw new Error(err as string);
    }
  },
};
