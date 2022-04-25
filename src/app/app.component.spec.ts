import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./core/authentication/authentication.service";
import {TokenService} from "./core/authentication/token.service";
import {LoadingService} from "./core/service/loading.service";
import {HeaderComponent} from "./core/layout/header/header.component";
import {FooterComponent} from "./core/layout/footer/footer.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthenticationService,TokenService,LoadingService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,HeaderComponent,FooterComponent
      ],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title 'promusic'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('promusic');
  });

  it('should render Logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('ProMusic');
  });
});
