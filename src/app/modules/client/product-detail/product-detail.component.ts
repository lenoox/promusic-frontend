import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../core/service/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../shared/model/product';
import {CartLocalStorageService} from '../../../core/service/cart-local-storage.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  isAddedProductToCart: boolean;
  countProductAdded;
  constructor(
    private productService: ProductService,
    private cartService: CartLocalStorageService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.countProductAdded = 0;
    this.loadItem();
  }
  loadItem(): Subscription  {
    const id = +this.route.snapshot.params['id'];

    return this.productService.GetProduct(id).subscribe((data: Product) => {
      this.product = data;
    });
  }

  setProduct(id): void{
    this.cartService.addProduct(id);
    this.countProductAdded++;
    this.isAddedProductToCart = true;
  }
  isEmployee(): boolean{
    return !!this.authenticationService.isEmployee();
  }
  isClient(): boolean{
    return !!this.authenticationService.isClient();
  }
}
