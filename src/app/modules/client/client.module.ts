import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoryComponent} from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import {ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {HttpClientModule} from "@angular/common/http";

export const CLIENTMODULES = [
  CommonModule,
  RouterModule,
  ClientRoutingModule,
  HttpClientModule,
  SharedModule,
  ReactiveFormsModule,
  QuillModule.forRoot()
]
@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    ProductDetailComponent,
    CartComponent,
    OrderComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: CLIENTMODULES
})
export class ClientModule {
}
