import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {QuillModule} from "ngx-quill";
import {HttpClientModule} from "@angular/common/http";
import {AccountRoutingModule} from "./account-routing.module";

export const ACCOUNTMODULES = [
  CommonModule,
  RouterModule,
  AccountRoutingModule,
  SharedModule,
  HttpClientModule,
  ReactiveFormsModule,
  QuillModule.forRoot()
]
@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: ACCOUNTMODULES
})
export class AccountModule { }
