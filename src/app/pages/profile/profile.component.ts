import { Component  ,ViewContainerRef ,OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../repositories/user/user';
import { Login } from '../../repositories/login/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent   {
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

  userData : any = {
    name : this.smi.name,
    city : this.smi.city,
    province : this.smi.province,
    postal_code : this.smi.postal_code,
    country : this.smi.country
  };

  constructor( private user:User ,private login:Login,private router:Router) {

  }

 ngOnInit(){

 }

  /**
   * Handles updating the user.
   */
 updateUser() {
   var postData : any = {
     name : this.userData.name,
     city : this.userData.city,
     province : this.userData.province,
     postal_code : this.userData.postal_code,
     country : this.userData.country
   };

   if(this.userData.email != "" && this.smi.email == this.userData.email){
     postData.email = this.userData.email;
   }

   if(this.userData.password != ""){
     postData.password = this.userData.password;
   }

    this.user.updateUser(postData);
  }




}
