import { Injectable } from '@angular/core';
import {environment } from '../../../environments/environment';
import { Http , Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class UserService {

  url = environment.baseApiUrl+'/'+environment.baseApiPrefix+'/'+environment.baseApiVersion;
  result : any;

  constructor(private http: Http) {

  }

   /**
    * should create new user process
    * @param username 
    * @param useremail 
    * @param userpassword 
    */
   create(username,useremail,userpassword) {
     let postData = {
      client_id : environment.baseApiClientId ,
      client_secret :environment.baseApiClientSecret,
      grant_type : environment.baseApiGrantType,
      name : username,
      email: useremail,
      password :userpassword,
      provider : "system",
      provider_id : 1
     };

     const headers = new Headers();
     headers.append('Content-Type', 'application/json; charset=utf-8');
     headers.append('Access-Control-Allow-Origin', '*');
     let options = new RequestOptions({ headers: headers });
     return this.http.post( this.url+'/users', { data : postData },options);
    }


      /**
    * should create new user for social process
    * @param username 
    * @param useremail 
    * @param provider 
    */
    createSocial(username,useremail,provider) {
      console.log('servicio',username,useremail,provider);
    let postData = {
     client_id : environment.baseApiClientId ,
     client_secret :environment.baseApiClientSecret,
     grant_type : environment.baseApiGrantType,
     name : username,
     email: useremail,
     password :'12345',
     provider : provider,
     provider_id : 1
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.url+'/users', { data : postData },options);
   }
}
