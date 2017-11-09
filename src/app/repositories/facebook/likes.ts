/**
 * Created by codehead on 11/9/17.
 */
import { likesInterface } from '../../contracts/facebook/likesInterface';
import { Injectable } from '@angular/core';
import { FacebookService } from '../../services/facebook/facebook'

@Injectable()
export class Likes implements likesInterface {

  public constructor(public facebook : FacebookService){

  }

  /**
   * Handles liking a post
   */
  public likePost() {

  }

  /**
   * Handles liking a photo
   */
  public likePhoto() {

  }

  /**
   * Handles liking a page
   */
  public likePage() {

  }

  /**
   * Handles liking a video
   */
  public likeVideo() {

  }

}
