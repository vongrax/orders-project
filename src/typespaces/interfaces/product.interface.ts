export interface Product {
  id: number;
  title: string;
  price: number;
}
export interface AddedProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
}
