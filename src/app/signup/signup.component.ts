import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

import { Injectable } from '@angular/core';
import { User } from '../repositories/user/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
@Injectable()
export class SignupComponent implements OnInit  {

  result : any;
  userData = {};

    constructor( private router :Router, private user :User) {

    }

    ngOnInit() {

    }

     /**
      * Handles create new user process
      * @param username
      * @param useremail
      * @param userpassword
      */
     createUser() {
       console.log(this.userData);
       let data = this.userData;
       this.user.create(data);
      }
}
