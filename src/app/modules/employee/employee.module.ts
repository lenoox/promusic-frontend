import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import {HomeComponent} from './home/home.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {SharedModule} from '../../shared/shared.module';
import { EmployeeComponent } from './employee.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    OrderListComponent,
    EmployeeComponent,
    AddProductComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
