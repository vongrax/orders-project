import { CreateOrder } from '@/typespaces/types/create-order.type';
import InstanceHttpClient from './instance';

export default class OrderClient extends InstanceHttpClient {
  constructor() {
    super('save.php');
  }

  async createOrder(data: CreateOrder[]): Promise<{ success: boolean; code: string }> {
    try {
      return await this.apiCall({
        method: 'POST',
        data,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
