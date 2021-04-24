import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

const CART = 'cart_token';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsChanged = new Subject<string>();
  private products: number[] = this.getProducts();

  setProducts(products: number[]): void {
    this.products = products;
    localStorage.setItem(CART, JSON.stringify(this.products.slice()));
    this.productsChanged.next('changed');
  }

  getProducts(): number[] {
    const cart = JSON.parse(localStorage.getItem(CART));
    return cart;
  }

  getProduct(index: number): string {
    const cart = JSON.parse(localStorage.getItem(CART));
    return cart[index];
  }

  addProduct(product: number): void {
    this.products.push(product);
    localStorage.setItem(CART, JSON.stringify(this.products.slice()));
    this.productsChanged.next('changed');
  }

  updateProduct(index: number, newProduct: number): void {
    this.products[index] = newProduct;
    localStorage.setItem(CART, JSON.stringify(this.products.slice()));
    this.productsChanged.next('changed');
  }

  deleteProduct(id: number): void {
    console.log(this.products.length);
    for (var i = this.products.length - 1; i >= 0; --i) {
      if (this.products[i] === id) {
        this.products.splice(i, 1);
      }
    }
    localStorage.setItem(CART, JSON.stringify(this.products.slice()));
    this.productsChanged.next('changed');
  }

  deleteProducts(): void {
    this.products = [];
    localStorage.setItem(CART, JSON.stringify(this.products));
    this.productsChanged.next('changed');
  }

  showSizeProducts(): number {
    return this.products.length;
  }
}
