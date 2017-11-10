import { LoginInterface } from '../../contracts/login/loginInterface';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
@Injectable()
export class Login  implements LoginInterface {
    result:any;
  public constructor( private  loginService:LoginService ,private router:Router ){

  } 

    /**
    * Handles Auterntication whit Email and password
    */
    public login(Email,Password) {  
    this.loginService.Auth(Email,Password).subscribe((response  )=> {
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
            this.navigationStar();
        }  
    }

    /**
     * session start navigation
     */
    navigationStar(){
        this.router.navigate(['/starter']);
    }
}
