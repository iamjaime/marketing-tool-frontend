import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class Login implements LoginInterface {

  result: any;
  token: string;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  private socket: io.Socket;


  public constructor(private loginService: LoginService, private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.socket = io(environment.urls);
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
        this.toastr.success('   you are welcome' + result.data.name, '  successful ');
      }
      );

    });
  }

  /**
 *  Handles assign session by Email autentication
 */
  assignSession(sessionData) {
    this.ConecteUserOnline(sessionData);
    sessionData.token = this.token;
    if (!sessionData.avatar) {
      sessionData.avatar = 'assets/images/users/1.jpg';
    }
    var smi = sessionData;
    sessionStorage.setItem('smi', JSON.stringify(smi));
    this.navigateToStart();
  }

  /**
   * session start navigation
   */
  navigateToStart() {
    this.router.navigate(['/starter']);
  }

  /**
   * session start socket
   */
  ConecteUserOnline(sessionData) {
    this.socket.emit('set-connection', sessionData.name, sessionData.avatar);
  }
}
