import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../repositories/login/login';
import * as io from 'socket.io-client';
import {environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userData : any = { };
    smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
    private socket: io.Socket;


    constructor(public router: Router, private _loginService: Login, private alert:ToastrService) {

      this.socket = io(environment.urls);
    }

    ngOnInit() {
        if (this.smi) {
            this.navigateToStart();
        }
    }
    /**
     * Handles authentication process
     * @param Email
     * @param Password
     */
    login( ) {
        if(this.userData.email && this.userData.password){
            this._loginService.login(this.userData);
            this.navigateToStart();
        }else{
            this.alert.error( 'empty data','error');
        }
        
    }



    /**
     * session start navigation
     */
    navigateToStart() {
        this.router.navigate(['/starter']);
    }
}
