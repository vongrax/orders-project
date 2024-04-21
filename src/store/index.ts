import { createLogger, createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { ProductsStore, State as IProductsStore, store as products } from './modules/products';

export type RootState = {
  products: IProductsStore;
};

export type Store = ProductsStore<Pick<RootState, 'products'>>;

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    products: state.products,
  }),
});

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({}), vuexLocal.plugin] : [vuexLocal.plugin];

export const store = createStore({
  plugins,
  modules: {
    products,
  },
});

export default function useStore(): Store {
  return store as Store;
}
