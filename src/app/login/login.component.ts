import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from "angular4-social-login";
import { Login } from '../repositories/login/login';
import { User } from '../repositories/user/user';
import { FacebookRepository as Facebook } from '../repositories/facebook/facebook';
import * as io from 'socket.io-client';
import {environment } from '../../environments/environment';

 

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    result: any;
    private user: SocialUser;
    private loggedIn: boolean;
    sperson: any
    private socket: io.Socket;
 

    constructor(private FB: Facebook, public router: Router, private _loginService: Login, private _userService: User) {
 
      this.socket = io(environment.urls);
    }

    ngOnInit() {
        if (sessionStorage.getItem('token')) {
            this.navigateToStart();
        }
    }
    /**
     * Handles authentication process
     * @param Email
     * @param Password
     */
    login(Email, Password) {
        this._loginService.login(Email, Password);
    }



    /**
     * session start navigation
     */
    navigateToStart() {
        this.router.navigate(['/starter']);
 
    } 
}
