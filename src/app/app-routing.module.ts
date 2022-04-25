import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/client/client.module#ClientModule'
  },
  {
    path: '',
    loadChildren: './modules/employee/employee.module#EmployeeModule'
  },
  {
    path: '',
    loadChildren: './modules/account/account.module#AccountModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
