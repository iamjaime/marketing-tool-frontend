import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class OrderService {

  url = environment.baseApiUrl + '/' + environment.baseApiPrefix + '/' + environment.baseApiVersion; 
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));

  constructor(private http: Http) { 
  }

  /**
   * should create new Orders process
   * @param username
   * @param useremail
   * @param userpassword
   */
  create(username, url,quantyly) {
    let postData = { 
      service_provider_id : 1,
      service_id : 3,
      quantity : quantyly,
      url:url 
    };

    const headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/orders', { data: postData }, options);
  }

  /**
   * Handles getting order info
   * @returns {Observable<Response>}
   */
  getOrderInfo( ) {
    const headers = new Headers(); 
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get(this.url + '/orders/service-provider/1', options).map(res => res.json()).toPromise();
  } 
}
