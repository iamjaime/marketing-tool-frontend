import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private router :Router) { }

    ngOnInit() { }

    /**
     * Handles create new user process
     */
    createUser(name,email,password,passwordverification) {
        if(password===passwordverification){ 
            console.log(name,email,password,passwordverification);
            console.log('password  correct');
            return 'true'; 
         } 
         else{  
            console.log(name,email,password,passwordverification);
            console.log('password incorrect');
             return'false';
            } 
     }
}
