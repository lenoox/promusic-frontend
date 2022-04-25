import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {QuillModule} from "ngx-quill";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, QuillModule.forRoot(), NgbModule, BrowserModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
