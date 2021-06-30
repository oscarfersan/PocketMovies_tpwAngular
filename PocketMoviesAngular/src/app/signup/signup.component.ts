import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../classes/User';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private regService: RegisterService) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    inputFName: new FormControl('', [Validators.required]),
    inputLName: new FormControl('', [Validators.required]),
    inputUsername: new FormControl('', [Validators.required]),
    inputEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    inputPassword1: new FormControl('', [Validators.required]),
    inputPassword2: new FormControl('', [Validators.required])
  })

  get passwordsDontMatch() {
    if (this.signupForm.get("inputPassword1").value == this.signupForm.get("inputPassword2").value)
      return false;
    else
      return true;
  }

  submitForm() {
    if (this.signupForm.get("inputFName").invalid || this.signupForm.get("inputLName").invalid || this.signupForm.get("inputEmail").invalid || this.signupForm.get("inputPassword1").invalid || this.signupForm.get("inputPassword2").invalid || this.passwordsDontMatch) {
      window.alert("Please fill in all required fields with valid information.");
      return;
    }

    this.regService.register(new User(this.signupForm.get("inputFName").value, this.signupForm.get("inputLName").value, this.signupForm.get("inputUsername").value, this.signupForm.get("inputEmail").value, this.signupForm.get("inputPassword1").value));
  }

}
