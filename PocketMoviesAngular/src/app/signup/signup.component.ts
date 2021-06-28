import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor() { }

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

    submitForm() {
        
    }

}
