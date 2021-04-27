import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {EmployeeGuard} from '../../core/guards/employee.guard';
import {EmployeeComponent} from './employee.component';
import {AddProductComponent} from './product/add-product/add-product.component';


const routes: Routes = [
  {
    path: 'employee',
    canActivate: [ EmployeeGuard ],
    component: EmployeeComponent,
    children: [
      { path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'order',
        component: OrderListComponent,
      },
      {
        path: 'product/add',
        component: AddProductComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
