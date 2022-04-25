import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {OrderService} from "../../../core/service/order.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CategoryService} from "../../../core/service/category.service";
import {ProductService} from "../../../core/service/product.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let authenticationService: any;
  let router: Router;
  beforeEach(waitForAsync( () => {
    const authenticationSpy = jasmine.createSpyObj('AuthenticationService', ['getUserInfo']);
    const orderSpy = jasmine.createSpyObj('OrderService', ['CreateOrder']);
    const categorySpy = jasmine.createSpyObj('CategoryService', ['GetCategorys']);
    const productSpy = jasmine.createSpyObj('ProductService', ['GetProduct']);
    let categoryService;
    let productService;
    let orderService;
    let authenticationService;
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule, ReactiveFormsModule, BrowserModule,NgbModule],
      providers: [
        {provide: CategoryService, useValue: categorySpy},
        {provide: ProductService, useValue: productSpy},
        {provide: OrderService, useValue: orderSpy},
        {provide: AuthenticationService, useValue: authenticationSpy}
      ]
    })
    .compileComponents().then(()=>{
      router = TestBed.inject(Router);
      categoryService = TestBed.inject(CategoryService);
      productService = TestBed.inject(ProductService);
      orderService = TestBed.inject(OrderService);
      authenticationService = TestBed.inject(AuthenticationService);
      router.getCurrentNavigation = jasmine.createSpy().and.returnValue({
        extras: {
          state: {
            cart:{"grandTotal":996.00,"productOrder":[{"id":null,"quantity":3,"product":{"id":7,"name":"M-20","slug":"m-20","quantity":7,"price":299.00,"description":"<p>Próbkowanie: 96 kHz / 24 bit</p><p>Kompatybilność: Windows, Mac OS</p>","thumbnail":"https://cdn.pixabay.com/photo/2016/03/16/21/23/microphone-1261793_960_720.jpg","category":{"id":2,"name":"Mikrofony","slug":"mikrofony"},"brand":{"id":2,"name":"DHQForMusic"},"eanCode":"96470427"}},{"id":null,"quantity":1,"product":{"id":2,"name":"V-160","slug":"v-160","quantity":6,"price":99.00,"description":"<p>Typ: wokółuszne</p><p>Pasmo przenoszenia: 20 Hz - 20 000 Hz</p><p>Impedancja:&nbsp;32 Ohm</p><p>Konstrukcja: zamknięte</p>","thumbnail":"https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_960_720.jpg","category":{"id":1,"name":"Słuchawki","slug":"sluchawki"},"brand":{"id":1,"name":"TSPV"},"eanCode":"72550309"}}]}
          },
        },
      });
      fixture = TestBed.createComponent(OrderComponent);
      component = fixture.componentInstance;
      authenticationSpy.getUserInfo.and.returnValue(Promise.resolve({"id":2,"firstName":"Jan","lastName":"Kowalski","username":"jan.kowalski@wp.pl","address":"ul. Ogrodowa  12/8C 10-001","phoneNumber":"001-002-143","city":"Warszawa","active":true,"role":{"id":1,"name":"USER"}}));
      orderSpy.CreateOrder.and.returnValue({"note":"test","grandTotal":996,"productOrder":[{"quantity":1,"product":{"id":2,"brand":{"name":"TSPV"},"name":"V-160","thumbnail":"https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_960_720.jpg","price":99}},{"quantity":3,"product":{"id":7,"brand":{"name":"DHQForMusic"},"name":"M-20","thumbnail":"https://cdn.pixabay.com/photo/2016/03/16/21/23/microphone-1261793_960_720.jpg","price":299}}]});
      productSpy.GetProduct.and.returnValue({});
      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
