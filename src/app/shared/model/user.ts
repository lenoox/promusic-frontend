import {Role} from './role';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  phoneNumber: string;
  city: string;
  active?: string;
  role: Role;
}
