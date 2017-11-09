/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../../environments/environment';
import { Http ,Headers,RequestOptions,Response} from '@angular/http';

@Injectable()
export class FacebookService {

  url = environment.baseApiUrl ;
  result:any;
  response:any;

  constructor(private http: Http,private router :Router) {

  }

  /**
   * Handles getting facebook user details
   * @returns {Observable<Response>}
   */
  getUserDetails() {
    //do something here
  }
}
