import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../../core/service/order.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartRequest} from '../../../shared/model/cart';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {User} from '../../../shared/model/user';
import {ProductOrder} from '../../../shared/model/productOrder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  routeState: any;
  orderForm: FormGroup;
  cart: CartRequest;
  userInfo: User;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private orderService: OrderService,
              private authenticationService: AuthenticationService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.cart = this.routeState.cart ? this.routeState.cart : '';
      }
    }
  }
  ngOnInit(): void {
    this.authenticationService.getUserInfo().then(data => {
      this.userInfo = data;
    });
    this.orderForm = this.formBuilder.group({
      note: ['', [Validators.required]],
      grandTotal: ['', [Validators.required]],
      productOrder: this.formBuilder.array([]),
    });
    const control = this.orderForm.get('productOrder') as FormArray;
    if (!!this.cart?.grandTotal){
      this.orderForm.patchValue({
        grandTotal: this.cart.grandTotal
      });
    }
    this.cart?.productOrder.forEach(x => {
      control.push(this.patchValues( x.quantity, x.product));
    });


  }
  patchValues(quantity, product): FormGroup {
    return this.formBuilder.group({
      quantity: [quantity],
      product: this.formBuilder.group({
        id: product.id,
        brand: this.formBuilder.group({
          name: product.brand.name
        }),
        name: product.name,
        thumbnail: product.thumbnail,
        price: product.price
      })
    });
  }
  get getControl(): { [p: string]: AbstractControl }{
    return this.orderForm.controls;
  }
  get getProductOrder(): ProductOrder[] {
    return this.orderForm.get('productOrder').value;
  }
  get getGrandTotal(): string {
    return this.orderForm.get('grandTotal').value;
  }
  onSubmit(): void {
    if (this.orderForm.value) {
      this.orderService.CreateOrder(this.orderForm.value)
        .subscribe(() => {
        }, (err: any) => {
          console.log(err);
        });
    }
  }
}
