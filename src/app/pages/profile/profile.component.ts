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
  token = sessionStorage.getItem('token');
  userName = sessionStorage.getItem('name');
  userEmail = sessionStorage.getItem('email');
  photo = sessionStorage.getItem('photo'); 
  Citys = sessionStorage.getItem('city');
  Countrys = sessionStorage.getItem('country');
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook')); 
  
  
  constructor( private user:User ,private login:Login,private router:Router) {
  }
 ngOnInit(){
 
 }
  /**
   * 
   * @param username 
   * @param useremail 
   * @param password 
   */
  updateUser(username,useremail,password,city,country) {
    this.user.updateUser(username,useremail,password,city,country);
    this.login.getInfoUser(this.token);
    this.router.navigate(['/starter']);
  } 
  
}
