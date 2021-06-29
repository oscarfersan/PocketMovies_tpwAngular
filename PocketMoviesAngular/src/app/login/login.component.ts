import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    inputUsername: new FormControl('', [Validators.required]),
    inputPassword: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get inputUsername() {
    return this.loginForm.get("inputUsername");
  }

  submitForm() {
    this.authService.login(this.loginForm.get("inputUsername").value, this.loginForm.get("inputPassword").value);
  }

}
