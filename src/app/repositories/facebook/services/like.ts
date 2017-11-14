/**
 * Created by codehead on 11/9/17.
 */
import { likeInterface } from '../../../contracts/facebook/services/likeInterface';
import { Injectable } from '@angular/core';
import { LikeService } from '../../../services/facebook/services/like';



@Injectable()
export class LikeRepository implements likeInterface {

  public constructor(public facebook: LikeService) {

  }

  /**
   *  Handles process to get the Likes
   * @param url 
   * @param quantity 
   */
  public getAllLikes(url, quantity) {
    this.facebook.getLikes(url);
    return url;
  } 
}
