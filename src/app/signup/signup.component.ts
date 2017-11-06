import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service/signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
 
export class SignupComponent implements OnInit {
    result:any;
    constructor( private router :Router, private _services :SignupService) { }

    ngOnInit() { }

    /**
     * Handles create new user process
     */
    createUser(name,email,password,passwordverification) { 
         this._services.Add(name,email,password,passwordverification).subscribe((response  )=> {
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
