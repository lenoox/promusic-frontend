import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from "./authentication/authentication.service";
import {TokenService} from "./authentication/token.service";
export const COREMODULES = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  SharedModule
]
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ],
  providers: [TokenService,AuthenticationService],
  imports: COREMODULES
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
