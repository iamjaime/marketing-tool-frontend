import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import {environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class Login  implements LoginInterface {

  result : any;
  token : string;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  private socket: io.Socket;


  public constructor(private loginService:LoginService, private router:Router, private userService : UserService,private toastr: ToastrService){
    this.socket = io(environment.urls);
  }

    /**
    * Handles Authentication with Email and password
    */
    public login(Email,Password) {
      this.loginService.Auth(Email,Password).then((res) => {
        this.token = res.access_token;
        this.userService.getUserInfo(this.token).then((result) => {
          console.log(result.data);
          this.assignSession(result.data);
          this.toastr.success ('   you are welcome'+result.data.name, '  successful ');
        }
         );

      });
    }

      /**
     *  Handles assign session by Email autentication
     */
    assignSession(sessionData){
      console.log(sessionData);
      sessionData.token = this.token;
        if(!sessionData.avatar) {
         sessionData.avatar = 'assets/images/users/1.jpg';
        }
      var smi = sessionData;
      sessionStorage.setItem('smi', JSON.stringify(smi));
      this.navigateToStart();
    }

    /**
     * session start navigation
     */
    navigateToStart(){
        this.socket.emit('set-connection', this.smi.name, this.smi.avatar);
        this.router.navigate(['/starter']);
    }

    /**
     * session assign session by Update
     */
    getInfoUser(token){
      this.userService.getUserInfo(token).then((result) => {
        sessionStorage.setItem('token',  token);
        sessionStorage.setItem('id', result.data.id);
        sessionStorage.setItem('name', result.data.name);
        sessionStorage.setItem('email', result.data.email);
        sessionStorage.setItem('city', result.data.city );
        sessionStorage.setItem('country', result.data.country);
        if(!result.data.avatar) {
          sessionStorage.setItem('photo', 'assets/images/users/1.jpg');
        }else{
          sessionStorage.setItem('photo', result.data.avatar);
        }
        this.toastr.success ('   update  '+result.data.name, '  successful ');
        return result;
      });
    }
}
