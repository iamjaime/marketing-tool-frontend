/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';

declare const FB: any;
@Injectable()

export class LikeService {

  constructor(private fb: FacebookService) {
    let initParams: InitParams = { appId: '531968097138866', xfbml: true, version: 'v2.10' };
    this.fb.init(initParams);
  }

  /**
   * Handles  get facebook Likes  process
   * @param id 
   */
  getLikes(id) {
    FB.api(
      '/' + id,
      'GET',
      { "fields": "likes" },
      function (response) {
        // Insert your code here
        console.log('likes');
        console.log(response);
      }
    );
  }
}
