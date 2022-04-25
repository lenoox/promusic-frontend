import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import {HomeComponent} from './home/home.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {SharedModule} from '../../shared/shared.module';
import { EmployeeComponent } from './employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import {HttpClientModule} from "@angular/common/http";

export const EMPLOYEEMODULE = [
  CommonModule,
  SharedModule,
  EmployeeRoutingModule,
  ReactiveFormsModule,
  HttpClientModule,
]
@NgModule({
  declarations: [
    HomeComponent,
    OrderListComponent,
    EmployeeComponent,
    OrderDetailComponent,
    ProductListComponent,
    ProductEditComponent
    ],
  imports: EMPLOYEEMODULE
})
export class EmployeeModule { }
