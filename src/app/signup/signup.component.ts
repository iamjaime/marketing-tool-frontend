import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User,userAction } from '../Contracts/user.service';
import { Injectable } from '@angular/core';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
@Injectable()
export class SignupComponent implements OnInit,userAction {
    result:any;
    constructor( private router :Router, private User :UserService) { }

    ngOnInit() { }

    /**
     * Handles create new user process
     */
  
     createUser(username,useremail,userpassword) {
        const data: User[] = [  {  name: username, email: useremail,  password: userpassword }  ];   
        this.User.create(data[0]).subscribe((response  )=> {
            this.result = response.json();
            console.log(this.result);
            return this.result ;
        },
        err => {
            this.result =err.json();
            return this.result  ;
            
        });
        console.log(data);
        return data;
      }
}
