import {User} from './user';
import {Status} from './status';
import {ProductOrder} from './productOrder';

export class Order {
  id?: number;
  note: string;
  client: User;
  status: Status;
  employee?: User;
  grandTotal: number;
  productOrder: ProductOrder[];
}
