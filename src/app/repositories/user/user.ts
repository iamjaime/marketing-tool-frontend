import { UserInterface } from '../../contracts/user/userinterface';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service'

@Injectable()
export class User implements UserInterface {
  result:any;
  public constructor(public userservice : UserService){

  } 

  /**
   * Handles Ceate new User whit service and interface 
   */
  public create( username,useremail,userpassword) { 
        this.userservice.create(username,useremail,userpassword).subscribe((response  )=> {
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
