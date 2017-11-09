import { Injectable } from '@angular/core';


export interface User {
    name: any;
    email: any;
    password: any;
     
}


@Injectable()
export abstract class userAction {
    /**
     * contract to create user
     */
    createUser: (name,email,password) => User[];
 
    
  }