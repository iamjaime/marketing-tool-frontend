import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    result:any;
    private user: SocialUser;
    private loggedIn: boolean;
    
    constructor(private authService: AuthService,public router: Router, private _loginService:LoginService) {

    }

    ngOnInit() {
         this.assignSocial();
    }
     /**
     * Handles authentication process
     */
    login(Email,Password) {
        
        this._loginService.Auth(Email,Password).subscribe((response  )=> {
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
    * Handles authentication with Facebook process
    */
    loginFacebook() {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID); 
    }

    /**
    * Handles authentication with Google process
    */
    loginGoogle(){
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); 
    } 

    /**
     * session start navigation
     */
    navigationStar(){
        this.router.navigate(['/starter']);
    }

    /**
     * Handles assign session by social autentication
     */
    assignSocial(){
        this.authService.authState.subscribe((user) => { 
            if(user){ 
                sessionStorage.setItem('token', user.id);
                sessionStorage.setItem('name', user.name);
                sessionStorage.setItem('email', user.email);
                sessionStorage.setItem('photo', user.photoUrl);
                this.authService.signOut();
                this.navigationStar();
             }
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
            this.router.navigate(['/starter']);
            this.authService.signOut();   
            this.navigationStar();
        }  
    }

    
}
