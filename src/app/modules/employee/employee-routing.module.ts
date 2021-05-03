import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {EmployeeGuard} from '../../core/guards/employee.guard';
import {EmployeeComponent} from './employee.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';


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
        path: 'order/:id',
        component: OrderDetailComponent,
      },
      {
        path: 'product',
        component: ProductListComponent,
      },
      {
        path: 'product/:id/edit',
        component: ProductEditComponent,
      },
      {
        path: 'product/new',
        component: ProductEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
