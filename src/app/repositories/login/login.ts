import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import {environment } from '../../../environments/environment';

@Injectable()

export class Login  implements LoginInterface {

  result : any;
  token : string;

  private socket: io.Socket;


  public constructor(private loginService:LoginService, private router:Router, private userService : UserService){
    this.socket = io(environment.urls);
  }

    /**
    * Handles Authentication with Email and password
    */
    public login(Email,Password) {
      this.loginService.Auth(Email,Password).then((res) => {
        this.token = res.access_token;
        this.userService.getUserInfo(this.token).then((result) => {
          this.assignSession(result.data);
        });

      });
    }

      /**
     *  Handles assign session by Email autentication
     */
    assignSession(sessionData){
      console.log(sessionData);
      sessionStorage.setItem('token', this.token);
      sessionStorage.setItem('name', sessionData.name);
      sessionStorage.setItem('email', sessionData.email);
      if(!sessionData.avatar) {
        sessionStorage.setItem('photo', 'assets/images/users/1.jpg');
      }else{
        sessionStorage.setItem('photo', sessionData.avatar);
      }
      this.navigateToStart();
    }

    /**
     * session start navigation
     */
    navigateToStart(){
        this.router.navigate(['/starter']);
        this.socket.emit('set-connection', sessionStorage.getItem('name'),sessionStorage.getItem('photo') );
    }
}
