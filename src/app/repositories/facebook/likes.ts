/**
 * Created by codehead on 11/9/17.
 */
import { likesInterface } from '../../contracts/facebook/likesInterface';
import { Injectable } from '@angular/core';
import { LikesService } from '../../services/facebook/likes';



@Injectable()
export class LikesRepositorio implements likesInterface {

  public constructor(public facebook: LikesService) {

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
