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
    this.login.getInfoUser(this.smi.token);
    this.router.navigate(['/starter']);
  } 
  
}
