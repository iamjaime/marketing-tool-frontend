import { UserInterface } from '../../contracts/user/userinterface';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service'

@Injectable()
export class User implements UserInterface {
  result:any;
  public constructor(public userservice : UserService){

  } 

  /**
   *  Handles Ceate new User whit service and interface 
   * @param userName 
   * @param userEmail 
   * @param userPassword 
   */
  public create( userName,userEmail,userPassword) { 
        this.userservice.create(userName,userEmail,userPassword).subscribe((response  )=> {
            this.result = response.json();
            console.log(this.result);
            return this.result ;
        },
        err => {
            this.result =err.json();
            return this.result  ;
        }); 
      } 

  /**
   * Handles Ceate new User Social  service and interface 
   * @param userName 
   * @param userEmail 
   * @param userprovider 
   */
  public createUserSocial( userName,userEmail,userprovider) { 
      console.log('repositorio',userName,userEmail,userprovider);
    this.userservice.createSocial(userName,userEmail,userprovider).subscribe((response  )=> {
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
