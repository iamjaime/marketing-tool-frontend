import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {

  url = environment.baseApiUrl + '/' + environment.baseApiPrefix + '/' + environment.baseApiVersion;
  result: any;
  token = sessionStorage.getItem('token');
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

  constructor(private http: Http) {

  }

  /**
   * should create new user process
   * @param username
   * @param useremail
   * @param userpassword
   */
  create(username, useremail, userpassword) {
    let postData = {
      client_id: environment.baseApiClientId,
      client_secret: environment.baseApiClientSecret,
      grant_type: environment.baseApiGrantType,
      name: username,
      email: useremail,
      password: userpassword,
      provider: 'system',
      provider_id: 1
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/users', { data: postData }, options);
  }

  /**
   * Handles getting authenticated user's info
   * @returns {Observable<Response>}
   */
  getUserInfo(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/users', options).map(res => res.json()).toPromise();
  }


  /**
  * should create new user for social process 
  */
  createSocial() {
    console.log(this.facebook.friends_count);
    let access_token = sessionStorage.getItem('token');
    let postData = {
      provider_id: 1,
      provider_account_id: this.facebook.id,
      traffic: this.facebook.friends_count
    };

    const headers = new Headers();

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);

    let options = new RequestOptions({ headers: headers });
    console.log(options);
    console.log(postData);
    return this.http.post(this.url + '/users/attach_to_service_provider', { data: postData }, options);
  }

  /**
   * should Update   user  Data
   * @param username 
   * @param useremail 
   * @param password 
   * @param city 
   * @param country 
   */
  updateUser(username, useremail, password,city,country) {
    let postData = {
      name: username,
      email: useremail,
      password: password,
      city:city,
      country:country
    };

    const headers = new Headers();
    let access_token = sessionStorage.getItem('token');
    let id = sessionStorage.getItem('id'); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token); 
    let options = new RequestOptions({ headers: headers });
 
    return this.http.put(this.url + '/users/' + id, { data: postData }, options);
  }

}
