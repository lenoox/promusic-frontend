import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountComponent } from './my-account.component';
import { ACCOUNTMODULES} from "../account.module";
import {RouterTestingModule} from "@angular/router/testing";
import {TokenService} from "../../../core/authentication/token.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let tokenService: TokenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountComponent ],
      providers: [ TokenService ],
      imports: [ ACCOUNTMODULES, RouterTestingModule, NgbModule, BrowserModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    tokenService = TestBed.inject(TokenService);
    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
