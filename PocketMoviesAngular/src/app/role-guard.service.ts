import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }
  
    canActivate(): boolean {
      if (!this.authService.isLoggedIn || !this.authService.isSuperUser()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
}
