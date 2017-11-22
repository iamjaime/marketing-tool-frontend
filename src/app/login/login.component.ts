import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from "angular4-social-login";
import { Login } from '../repositories/login/login';
import { User } from '../repositories/user/user';
import { FacebookRepository as Facebook } from '../repositories/facebook/facebook';


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

    constructor(private FB: Facebook, public router: Router, private _loginService: Login, private _userService: User) {

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

    /**
     * login  for facebook
     */
    loginSocialFacebook() {

      this.FB.getLoginStatus().then((response) => {
        console.log(response);
        if(response.status == "connected"){
          sessionStorage.setItem('id', response.authResponse.accessToken);

          this.FB.getUser(response.authResponse.userID).then((res) => {
            sessionStorage.setItem('token', res.id);
             sessionStorage.setItem('name', res.name);
             sessionStorage.setItem('email', res.email);
             sessionStorage.setItem('photo', res.picture.data.url);

            this.navigateToStart();
          });
        }else{
          this.FB.login()
            .then((response) => {
              console.log(response);
              if(response.status == "connected"){
                sessionStorage.setItem('id', response.authResponse.accessToken);
                sessionStorage.setItem('loggedInType', 'facebook');
                this.FB.getUser(response.authResponse.userID).then((res) => {
                  sessionStorage.setItem('token', res.id);
                  sessionStorage.setItem('name', res.name);
                  sessionStorage.setItem('email', res.email);
                  sessionStorage.setItem('photo', res.picture.data.url);

                  this.navigateToStart();
                });
              }

            })
            .catch(e => console.error('Error logging in'));
        }
      });

    }




}
