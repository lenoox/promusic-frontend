import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoryComponent} from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    ProductDetailComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule {
}
