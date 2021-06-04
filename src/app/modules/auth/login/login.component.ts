import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserForm: FormGroup;
  responseMessage;
  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.loginUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get getControl(): { [p: string]: AbstractControl }{
    return this.loginUserForm.controls;
  }
  onSubmit(): void{
    this.authenticationService.login(this.loginUserForm.value)
      .subscribe(() => {
       this.router.navigate(['.']).then(_ => {});
      }, (err: any) => {
        this.responseMessage = false;
        console.log(err);
      });
  }
  isEmployee(): boolean{
    return this.authenticationService.isEmployee();
  }
  isClient(): boolean{
    return this.authenticationService.isClient();
  }
}
