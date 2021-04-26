import {Component, OnDestroy, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import { CartRequest, ProductOrderCart} from '../../../shared/model/cart';
import {CartLocalStorageService} from '../../../core/service/cart-local-storage.service';
import { CartService } from 'src/app/core/service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy{
  cart: number[] = this.cartLocalStorageService.getProducts();
  cartList: CartRequest;
  productsChanged;
  constructor(
      private router: Router,
      private cartLocalStorageService: CartLocalStorageService,
      private cartService: CartService) {
  }
  ngOnInit(): void {
    this.cartList = {
      grandTotal: null,
      productOrder: [],
    };
    this.getProductsByCart();
    this.productsChanged = this.cartLocalStorageService.productsChanged.subscribe(() => {
      this.getProductsByCart();
    });
  }
  ngOnDestroy(): void {
    this.productsChanged.unsubscribe();
  }
  getProductsByCart(): void{
    this.cart = this.cartLocalStorageService.getProducts();
    const cartTmp = { };
    for (let i = 0; i < this.cart?.length; i++) {
      cartTmp[this.cart[i]] = (cartTmp[this.cart[i]] || 0) + 1;
    }
    const arr = Object.keys(cartTmp).forEach((k) => {
      this.cartList.productOrder.push(this.patchValues( cartTmp[k], k));
    });
    if (this.cart?.length > 0) {
      this.cartService.GetProductsByCart(this.cartList).subscribe((cart) => {
        const productOrderResponse = cart.productOrder;
        let tmp = {
          grandTotal: null,
          productOrder: [],
        };
        for (let i = 0; i <  this.getProductOrder?.length; i++) {
          const productOrderLocalStorage = this.getProductOrder[i];
          for (let j = 0; j < productOrderResponse?.length; j++) {
            if (productOrderLocalStorage.product.id === productOrderResponse[j].product.id) {
              const fb = this.patchValues(productOrderLocalStorage.quantity, productOrderResponse[j]);
              const cartObject = {
                quantity: productOrderResponse[j].quantity,
                product: productOrderResponse[j].product
              };
              tmp.grandTotal = cart.grandTotal;
              tmp.productOrder.push(cartObject);
            }
          }
        }
        this.cartListClear();
        this.cartList = tmp;
      });
    }
  }

  get getProductOrder(): ProductOrderCart[]{
    return this.cartList.productOrder;
  }
  patchValues(quantityProduct, productId): ProductOrderCart {
    return {
      quantity: quantityProduct,
      product: {
        id: parseInt(productId, 10)
      }
    };
  }
  goToOrder(): void {
    this.router.navigate(['/order'], {
      state: {
        cart: this.cartList,
      }
    });
  }
  cartListClear(): void {
    this.cartList.grandTotal = undefined;
    this.cartList.productOrder = [];
  }
  cartClear(index, id): void {
    this.cartListClear();
    this.cartLocalStorageService.deleteProduct(id);
  }

  cartAllClear(): void {
    this.cartLocalStorageService.deleteProducts();
    this.cartListClear();
  }
}
