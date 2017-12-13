import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  url = environment.baseApiUrl + '/' + environment.baseApiPrefix + '/' + environment.baseApiVersion;
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));

  constructor(private http: HttpClient) {
  }

  /**
   * should create new Orders process
   * @param username
   * @param useremail
   * @param userpassword
   */
  create(username, url, quantyly) {
    let postData = {
      service_provider_id: 1,
      service_id: 3,
      quantity: quantyly,
      url: url
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.smi.token = sessionStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options: any = ({ headers: headers });
    return this.http.post(this.url + '/orders', { data: postData }, options).map(res => res).toPromise();
  }

  /**
   * Handles getting order info
   * @returns {Observable<Response>}
   */
  getOrderInfoAll() {



    this.smi.token = sessionStorage.getItem('token');

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = {
      headers: headers
    };
    return this.http.get(this.url + '/orders/service-provider/1', options).map(res => res).toPromise();
  }



  getOrderInfo() {




    this.smi.token = sessionStorage.getItem('token');

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = {
      headers: headers
    };
    return this.http.get(this.url + '/orders/service-provider/1/owned', options).map(res => res).toPromise();
  }


  /**
  * should respon orders 
  */
  responOrder(data) {

    console.log('repositorio orden');
    let postData = {
      order_id: data.order_id,
      provider_id: data.provider_id,
      provider_account_id: data.provider_account_id
    };



    this.smi.token = sessionStorage.getItem('token');

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = {
      headers: headers
    };
    return this.http.post(this.url + '/orders/fill', { data: postData }, options).map(res => res).toPromise();
  }
}
