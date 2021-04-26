import {Brand} from './brand';
import {Category} from './category';
export class Product {
  id?: number;
  name: string;
  slug: string;
  quantity: number;
  price: number;
  description: string;
  thumbnail: string;
  category: Category;
  brand: Brand;
  eanCode: string;
}
