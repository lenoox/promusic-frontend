import { Component, OnInit } from '@angular/core';
import {AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/service/user.service';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  matcher;
  registerUserForm: FormGroup;
  responseMessage;
  registerActive = environment.registerActive;

  constructor(public formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }, {validator: this.passwordConfirming} as AbstractControlOptions);
  }

  get getControl(): { [p: string]: AbstractControl }{
    return this.registerUserForm.controls;
  }
  onSubmit(): void{
    if(this.registerActive){
      delete this.registerUserForm.value.confirmPassword;
      console.log(this.registerUserForm);
      this.userService.CreateUser(this.registerUserForm.value).subscribe(resp => {
        if(resp.status === 200){
          this.responseMessage = true;
        }
      }, err => {
        this.responseMessage = false;
      });
    } else{
      console.log("Registration is disabled")
    }
  }
  passwordConfirming(form: FormGroup): { notEquivalent: boolean } {
     if (form.get('password').value !== form.get('confirmPassword').value) {
      return {notEquivalent: true};
    }
  }
}
