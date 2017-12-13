import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders ,HttpErrorResponse, HttpRequest,HttpEvent, HttpEventType} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  url = environment.baseApiUrl + '/' + environment.baseApiPrefix + '/' + environment.baseApiVersion;
  result: any;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));

  constructor(private http: HttpClient) {

  }

  /**
   * Handles creating a new user.
   *
   * @param {object} data  The data object
   * @returns {any}
   */
  create(data) {
    let postData = {
      client_id: environment.baseApiClientId,
      client_secret: environment.baseApiClientSecret,
      grant_type: environment.baseApiGrantType,
      name: data.name,
      email: data.email,
      password: data.password
    };

    const headers = new HttpHeaders();
 

    let options = {
      headers: headers
    };

    return this.http.post(this.url + '/users', { data: postData }).map((res) => res).toPromise();
  }

  /**
   * Handles getting the authenticated user's info
   * @returns {any}
   */
  getUserInfo() {
 
  this.smi.token = sessionStorage.getItem('token');
  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token); 
    headers.append('Access-Control-Allow-Origin', '*');
 
    var options =  ({ headers: headers });
 console.log(options);
    return this.http.get(this.url + '/users', options).map((res) => res).toPromise();
  }


  /**
   * Handles getting the authenticated user's info
   * @returns {any}
   */
  getUserInfoafter() {
   
      this.smi.token = sessionStorage.getItem('token');
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    headers.append('Access-Control-Allow-Origin', '*');

    var options =  ({ headers: headers });
    console.log(options);
    return this.http.get(this.url + '/users', options).map((res) => res).toPromise();
  }


  /**
   * Handles attaching a user to a social media network service provider.
   *
   * @param provider_id
   * @param provider_account_id
   * @param provider_traffic
   * @returns {Promise<R>}
   */
  attachNetwork(provider_id, provider_account_id, provider_traffic) {

    let postData = {
      provider_id: provider_id,
      provider_account_id: provider_account_id,
      traffic: provider_traffic
    };

    this.smi.token = sessionStorage.getItem('token');

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = {
      headers: headers
    };

    return this.http.post(this.url + '/users/attach_to_service_provider', { data: postData }, options).toPromise();
  }

  /**
   * Handles Updating the user
   *
   * @param data
   * @returns {any}
   */
  update(data) {
    var postData: any = {
      name: data.name,
      city: data.city,
      province: data.province,
      postal_code: data.postal_code,
      country: data.country
    };

    if (data.email === this.smi.email || data.email === '') {
    } else {
      postData.email = data.email;
    }

    if (data.password === "") {
    } else {
      postData.password = data.password;
    }

    this.smi.token = sessionStorage.getItem('token');

    const headers = new HttpHeaders();
    let id = sessionStorage.getItem('id');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = {
      headers: headers
    };

    return this.http.put(this.url + '/users/' + this.smi.id, { data: postData }, options).toPromise();
  }

}
