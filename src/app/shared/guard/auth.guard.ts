import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));

  constructor(private router: Router) {

    }

    canActivate() {
        if (this.smi.token) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
