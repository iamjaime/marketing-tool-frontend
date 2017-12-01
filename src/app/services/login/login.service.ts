import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class LoginService {
  url = environment.baseApiUrl;
  result: any;
  response: any;

  constructor(private http: Http, private router: Router) {

  }

  /**
   * Handles authentication service
   * @param username
   * @param password
   */
  Auth(data) {
    console.log(data);
    let postData = {
      client_id: environment.baseApiClientId,
      client_secret: environment.baseApiClientSecret,
      grant_type: environment.baseApiGrantType,
      username: data.email,
      password: data.password
    };

    return this.http.post(this.url + '/oauth/token', postData).map(res => res.json()).toPromise();

  }
}
