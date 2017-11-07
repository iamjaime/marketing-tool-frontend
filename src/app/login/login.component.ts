import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    result:any;
    constructor(public router: Router, private _loginService:LoginService) {}

    ngOnInit() {}


    /**
     * Handles authentication process
     */
    onLoggedin(Email,Password) {
        //localStorage.setItem('isLoggedin', 'true');
    this._loginService.Auth(Email,Password).subscribe((response  )=> {
        this.result = response.json();
        console.log(this.result);
        return this.result ;
    },
    err => {
        this.result =err.json();
        return this.result  ;
    });

    }

}
