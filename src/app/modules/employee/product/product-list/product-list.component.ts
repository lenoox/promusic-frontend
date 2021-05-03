import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../../core/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: any = [];
  page = 1;
  sizePage = 10;
  totalElements = 0;
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(): void{
    this.productService.GetProducts(this.page, this.sizePage).subscribe((data) => {
      this.productList = data.content;
      this.totalElements = data.totalElements;
    });
  }
}
