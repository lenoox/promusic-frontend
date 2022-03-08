import { Component, OnInit } from '@angular/core';
import {AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/service/user.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  matcher;
  userDetailsForm: FormGroup;
  userPasswordForm: FormGroup;
  isResponseUserDetails: boolean;
  isResponseUserPassword: boolean;
  demoActive = environment.demoActive;
  constructor(public formBuilder: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              ) {
  }

  ngOnInit(): void {
    this.userPasswordFormInit();
    this.userDetailsFormInit();
    this.getUserDetailsToForm();
  }
  userPasswordFormInit(): void{
    this.userPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    }, {validator: this.passwordConfirming} as AbstractControlOptions);
  }
  onSubmitPassword(): void{
    delete this.userDetailsForm.value.confirmNewPassword;
    this.userService.UpdateUserPassword(this.userPasswordForm.value).subscribe(resp => {
      if (resp.status === 200){
        this.isResponseUserPassword = true;
      }
    }, err => {
      this.isResponseUserPassword = false;
    });
  }
  get getControlPasswordForm(): { [p: string]: AbstractControl }{
    return this.userPasswordForm.controls;
  }
  getUserDetailsToForm(): void{
    this.authenticationService.getUserInfo().then(data => {
      this.userDetailsForm.patchValue(data);
    }, err => {
      console.log('blad pobierania danych do formualrza');
    });
  }
  userDetailsFormInit(): void{
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmitUserDetails(): void{
    this.userService.UpdateUser(this.userDetailsForm.value).subscribe(resp => {
      if (resp.status === 200){
        this.isResponseUserDetails = true;
      }
    }, err => {
      this.isResponseUserDetails = false;
    });
  }
  get getControlUserDetailsForm(): { [p: string]: AbstractControl }{
    return this.userDetailsForm.controls;
  }

  passwordConfirming(form: FormGroup): { notEquivalent: boolean } {
    if (form.get('newPassword').value !== form.get('confirmNewPassword').value) {
      return {notEquivalent: true};
    }
  }
}
