import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../repositories/login/login';
import * as io from 'socket.io-client';
import {environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    result: any;
    smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
    private socket: io.Socket;


    constructor(public router: Router, private _loginService: Login) {

      this.socket = io(environment.urls);
    }

    ngOnInit() {
        if (this.smi.token) {
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
