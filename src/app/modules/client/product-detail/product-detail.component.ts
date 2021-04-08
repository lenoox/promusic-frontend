import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../shared/service/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../shared/model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadItem();
  }
  loadItem(): Subscription  {
    const id = +this.route.snapshot.params['id'];

    return this.productService.GetProduct(id).subscribe((data: Product) => {
      this.product = data;
    });
  }
}
