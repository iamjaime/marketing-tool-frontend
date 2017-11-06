import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/User.service/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
 
export class SignupComponent implements OnInit {
    result:any;
    constructor( private router :Router, private User :UserService) { }

    ngOnInit() { }

    /**
     * Handles create new user process
     */
    createUser(name,email,password,passwordverification) { 
         this.User.Add(name,email,password,passwordverification).subscribe((response  )=> {
            this.result = response.json();
            console.log(this.result);
            return this.result ;   
        },
        err => {
            this.result =err.json();
            return this.result  ; 
        });  
     }
}
