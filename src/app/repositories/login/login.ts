import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../utils/helpers';

@Injectable()

export class Login implements LoginInterface {

  result: any;
  token: string;
  smi =  JSON.parse(sessionStorage.getItem('smi'));
  private socket: any;


  public constructor(private loginService: LoginService, private router: Router, private userService: UserService, private toastr: ToastrService, private helper : Helper) {
   // this.socket = io(environment.urls);
  }

  /**
  * Handles Authentication with Email and password
  */
  public login(userData) {

    this.loginService.Auth(userData).then((res) => {

      this.token = res.access_token;
      sessionStorage.setItem('token', this.token);

      this.userService.getUserInfo().then((result) => {
        console.log(result.data);
        this.assignSession(result.data);
        this.toastr.success(result.data.name + '!', 'Welcome Back');
        this.navigateToStart();
      }
      );

    }, (err) => {
      let error = err.json();
      this.toastr.error(error.message, 'Error');
    });
  }

  /**
 *  Handles assign session by Email autentication
 */
  assignSession(sessionData) {
    
    sessionData.token = this.token;
    if (!sessionData.avatar) {
      sessionData.avatar = 'assets/images/users/1.jpg';
    }
    var smi = sessionData;
    sessionStorage.setItem('smi', JSON.stringify(smi));
    sessionStorage.setItem('sm', JSON.stringify(smi));
    this.navigateToStart();
    this.loginService.ConecteUserOnline(sessionData);
  }

  /**
   * session start navigation
   */
  navigateToStart() {
    this.router.navigate(['/starter']);
  }

  
}
