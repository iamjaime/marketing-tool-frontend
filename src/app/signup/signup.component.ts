import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../environments/environment';
import { ServicesService } from '../services/services.service';
import { SignupService } from '../services/signup.service/signup.service';
import { Http ,Headers,RequestOptions} from '@angular/http';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
 
export class SignupComponent implements OnInit {
    result:any;
    constructor(private http: Http,private router :Router, private _services :SignupService) { }

    ngOnInit() { }

    /**
     * Handles create new user process
     */
    createUser(name,email,password,passwordverification) { 
         this._services.Add(name,email,password,passwordverification);
     }
}
