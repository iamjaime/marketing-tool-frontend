/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { FacebookSocket } from '../../../repositories/facebook/socket';

declare const FB: any;
@Injectable()

export class LikeService {

  constructor(private fb: FacebookSocket) { 
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
        console.log('likes');
        console.log(response);
      }
    );
  }
}
