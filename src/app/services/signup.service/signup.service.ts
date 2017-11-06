import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../../environments/environment';
import { Http ,Headers,RequestOptions,Response} from '@angular/http';
 
@Injectable()
export class SignupService {

  constructor(private http: Http,private router :Router) { }
  url = environment.baseApiUrl+'/'+environment.baseApiPrefix+'/'+environment.baseApiVersion;
 result:any;
 response:any;

   /**
    * Handles create new user process
    */
   Add(name,email,password,passwordverification) { 
     let postData = {
      client_id : environment.baseApiClientId ,
      client_secret :environment.baseApiClientSecret,
      grant_type : environment.baseApiGrantType,
      name : name,
      email:email,
      password :password,
      provider : "system",
      provider_id : 1
     };
       
     const headers = new Headers(); 
     headers.append('Content-Type', 'application/json; charset=utf-8'); 
     headers.append('Access-Control-Allow-Origin', '*');  
     let options = new RequestOptions({ headers: headers }); 
     return this.http.post( this.url+'/users', { data : postData },options);
    }
}
