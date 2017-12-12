import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../utils/helpers';

@Injectable()

export class Login implements LoginInterface {

  result: any;
  token: any;
  smi =  JSON.parse(sessionStorage.getItem('smi'));
  data:any =[];
  datatoken:any;
  public constructor(private loginService: LoginService, private router: Router, private userService: UserService, private toastr: ToastrService, private helper : Helper) {

  }

  /**
  * Handles Authentication with Email and password
  */
  public login(userData) {

    this.loginService.Auth(userData).then((res) => {
       this.data = res;
       this.datatoken = JSON.stringify(this.data);
       this.token = JSON.parse(this.datatoken); 
      //this.token = res.access_token;
      console.log(this.token);
     sessionStorage.setItem('token',this.token.access_token);

      this.userService.getUserInfo().then((result) => {
        var resul= JSON.stringify(result);
        var res = JSON.parse(resul); 
        console.log(res.data);
        this.assignSession(res.data);
        this.toastr.success(res.data.name + '!', 'Welcome Back');
        this.navigateToStart();
      },(err) => {
        console.log(err);
      }
      );

    }, (err) => {
      console.log(err);
      let error = err;
      this.toastr.error(error.message, 'Error');
    });
  }

  /**
 *  Handles assign session by Email autentication
 */
  assignSession(sessionData) {
 console.log('session');
 console.log(sessionData);
    sessionData.token = this.token;
    if (!sessionData.avatar) {
      sessionData.avatar = 'assets/images/users/1.jpg';
    }
    var smi = sessionData;
    sessionStorage.setItem('smi', JSON.stringify(smi));
    sessionStorage.setItem('sm', JSON.stringify(smi));
    this.navigateToStart();
    this.loginService.connectToSocket(sessionData);
  }

  /**
   * session start navigation
   */
  navigateToStart() {
    this.router.navigate(['/starter']);
  }


}
