import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../../environments/environment';
import { Http ,Headers,RequestOptions,Response} from '@angular/http';
 
@Injectable()
export class LoginService {

  constructor(private http: Http,private router :Router) { }
  url = environment.baseApiUrl ;
 result:any;
 response:any;

   /**
    * Handles authentication service
    */
   Auth(username, password) { 
    let postData = {
      client_id : environment.baseApiClientId ,
      client_secret :environment.baseApiClientSecret,
      grant_type : environment.baseApiGrantType,
      username : username,
      password :password
    };

    return this.http.post(this.url+'/oauth/token', postData);
    
    }
}
