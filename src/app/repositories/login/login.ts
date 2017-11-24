import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import {environment } from '../../../environments/environment';
 
@Injectable()

export class Login  implements LoginInterface {
    result:any;
    private socket: io.Socket;
 
   
  public constructor( private  loginService:LoginService ,private router:Router ){
    this.socket = io(environment.urls);
  }

    /**
    * Handles Auterntication whit Email and password
    */
    public login(Email,Password) {
    this.loginService.Auth(Email,Password).subscribe((response  )=> {
        console.log(response);
        this.result = response.json();
        this.assignSession(this.result.access_token,Email);
        return this.result.access_token ;
    },
    err => {
        this.result =err.json();
        return this.result  ;
    });
      }

      /**
     *  Handles assign session by Email autentication
     */
    assignSession(token,email){

        if(token){
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('name', email);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('photo', 'assets/images/users/1.jpg');
          
            this.navigateToStart();
        }
    }

    /**
     * session start navigation
     */
    navigateToStart(){
        this.router.navigate(['/starter']);
        this.socket.emit('set-conection', sessionStorage.getItem('name'),sessionStorage.getItem('photo') );
    }
}
