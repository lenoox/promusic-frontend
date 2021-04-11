import { Component, OnInit } from '@angular/core';
import {AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserForm: FormGroup;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginUserForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get getControl(): { [p: string]: AbstractControl }{
    return this.loginUserForm.controls;
  }
  onSubmit(): void{
    console.log(this.loginUserForm);
  }
}
