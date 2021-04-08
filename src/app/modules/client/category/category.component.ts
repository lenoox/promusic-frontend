import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/service/product.service';
import {Subscription} from 'rxjs';

import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productList: any = [];
  pathUploads;

  constructor(private productService: ProductService) {
    this.pathUploads = environment.pathUploads;
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): Subscription {
    return this.productService.GetProducts().subscribe((data: {}) => {
      this.productList = data;
    });
  }
}
