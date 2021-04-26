import {ProductOrder} from './productOrder';
import {Brand} from './brand';
import {Category} from './category';
export class Cart {
  id?: number;
  grandTotal: number;
  productOrder: ProductOrder[];
}
export class CartRequest {
  id?: number;
  grandTotal: number;
  productOrder: ProductOrderCart[];
}
export class ProductOrderCart {
  id?: number;
  quantity: number;
  product: ProductCart;
}
export class ProductCart {
  id: number;
  name?: string;
  slug?: string;
  quantity?: number;
  price?: number;
  description?: string;
  thumbnail?: string;
  category?: Category;
  brand?: Brand;
  eanCode?: string;
}
