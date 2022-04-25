import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [ RouterTestingModule, NgbModule, BrowserModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
