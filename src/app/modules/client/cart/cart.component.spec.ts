import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, NgbModule, BrowserModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
