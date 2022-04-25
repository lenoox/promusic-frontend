import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountComponent } from './my-account/my-account.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {ClientRoutingModule} from "../client/client-routing.module";
import {QuillModule} from "ngx-quill";
import {HttpClientModule} from "@angular/common/http";

export const ACCOUNTMODULES = [
  CommonModule,
  RouterModule,
  ClientRoutingModule,
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
