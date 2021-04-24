import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../core/service/cart.service';
import {ProductService} from '../../../core/service/product.service';
import {ProductOrder} from '../../../shared/model/productOrder';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: number[] = this.cartService.getProducts();
  cartList: ProductOrder[] = [];
  constructor(
              private router: Router,
              private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartService.productsChanged.subscribe(() => {
      this.getProducts();
    });
  }
  getProducts(): void{
  this.cart = this.cartService.getProducts();
    if (this.cart.length > 0) {
      const array = [];
      const result = { };
      for (let i = 0; i < this.cart.length; i++) {
        result[this.cart[i]] = (result[this.cart[i]] || 0) + 1;
      }
      let arr = Object.keys(result).map((k) => Number(k));
      this.productService.GetProductsByIds(Object.keys(result)).subscribe((product) => {
        for ( let i = 0; i < arr.length; i++) {
          for (let j = 0; j < product.length; j++) {
            if (arr[i] === product[j].id) {
              var cartObject = {
                quantity: result[product[j].id],
                product: product[j]
              };
              this.cartList.push(cartObject);
            }
          }
        }
      });
    }
  }
  goToOrder(): void {
    this.router.navigate(['/order'], {
      state: {
        products: this.cartList,
      }
    });
  }
  cartClear(index, id): void {
    this.cartList = [];
    this.cartService.deleteProduct(id);

  }
  cartAllClear(): void {
    this.cartService.deleteProducts();
    this.cartList = [];
  }
}
