import { ProductResponse } from '@/typespaces/interfaces/product.interface';
import InstanceHttpClient from './instance';

export default class ProductsClient extends InstanceHttpClient {
  constructor() {
    super('products.php');
  }

  async fetchProducts(): Promise<ProductResponse> {
    try {
      return await this.apiCall({
        method: 'GET',
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
