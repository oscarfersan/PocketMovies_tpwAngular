import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Genre } from './classes/Genre';
import { User } from './classes/User';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private registerUrl: string;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private router: Router) {
        this.registerUrl = environment.baseUrl + '/register/';
    }

    register(newUser: User) {
        this.http.post<string>(this.registerUrl, newUser, this.httpOptions)
            .subscribe(
                value => {
                    if (value != null) {
                        this.router.navigate(['/login']);
                        console.log(value);
                    } else {
                        window.alert("Invalid credentials!");
                    }
                },
                error => { return throwError("Authentication request unsuccessful.") }
            );
    }
}
