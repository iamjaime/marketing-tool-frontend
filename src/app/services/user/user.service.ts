import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {

  url = environment.baseApiUrl + '/' + environment.baseApiPrefix + '/' + environment.baseApiVersion;
  result: any;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));

  constructor(private http: Http) {

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

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/users', { data: postData }, options).map((res) => res.json()).toPromise();
  }

  /**
   * Handles getting the authenticated user's info
   * @returns {any}
   */
  getUserInfo() {

    if (sessionStorage.getItem('token')) {
      this.smi.token = sessionStorage.getItem('token');
      sessionStorage.removeItem('token');
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/users', options).map(res => res.json()).toPromise();
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

    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/users/attach_to_service_provider', { data: postData }, options).map((res) => res.json()).toPromise();
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

    const headers = new Headers();
    let id = sessionStorage.getItem('id');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.smi.token);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + '/users/' + this.smi.id, { data: postData }, options).map(res => res.json()).toPromise();
  }

}
