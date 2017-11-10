/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';

declare const FB: any;
@Injectable()
export class FacebookServices { 
  url = environment.baseApiUrl;
  result: any;
  response: any;

  constructor(private http: Http, private router: Router, private fb: FacebookService) {
    let initParams: InitParams = {  appId: '531968097138866', xfbml: true,  version: 'v2.10'  };
    this.fb.init(initParams);
  }


  /**
   * Handles getting facebook whit id
   */
  getUserDetails(id) {
    FB.api(
      '/'+id,
      'GET',
      { "fields": "sharedposts{from,name,description,full_picture,is_published,permalink_url,created_time},format" },
      function (response) { this.result = response;
        console.log(this.result);
      }
    );
  }
  

}
