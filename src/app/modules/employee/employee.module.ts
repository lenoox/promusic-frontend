import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import {HomeComponent} from './home/home.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {SharedModule} from '../../shared/shared.module';
import { EmployeeComponent } from './employee.component';


@NgModule({
  declarations: [
    HomeComponent,
    OrderListComponent,
    EmployeeComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
