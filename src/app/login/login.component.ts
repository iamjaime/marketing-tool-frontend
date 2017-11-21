import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { SocialUser } from "angular4-social-login";
import { Login } from '../repositories/login/login';
import { User } from '../repositories/user/user';
import { FacebookSocket } from '../repositories/facebook/socket';

declare const FB: any;
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

    constructor(private fb: FacebookSocket, public router: Router, private _loginService: Login, private _userService: User) {

    }

    ngOnInit() {
        if (sessionStorage.getItem('token')) {
            this.navigationStar();
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
    navigationStar() {
        this.router.navigate(['/starter']);
    }

    /**
     * login  for facebook
     */
    loginSocialFacebook() { 
           
            FB.login(
                function (response) {
                    console.log(response);
                    sessionStorage.setItem('id', response.authResponse.accessToken);
                    this.sperson = sessionStorage.getItem('id');
                    if (this.sperson) {
                        FB.api('/' + response.authResponse.userID,
                            'GET',
                            { "fields": "name,email,picture,first_name,last_name" },
                            function (response) {
                                console.log(response);
                                sessionStorage.setItem('token', response.id);
                                sessionStorage.setItem('name', response.name);
                                sessionStorage.setItem('email', response.email);
                                sessionStorage.setItem('photo', response.picture.data.url);
                            }
                        );
                    }
                }
            );
            if (sessionStorage.getItem('token')) {
                this.navigationStar();
            }
        }
}
