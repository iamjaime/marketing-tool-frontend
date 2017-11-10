/**
 * Created by codehead on 11/9/17.
 */
import { likesInterface } from '../../contracts/facebook/likesInterface';
import { Injectable } from '@angular/core';
import { FacebookServices } from '../../services/facebook/facebook';
 

 
@Injectable()
export class Likes implements likesInterface {

  public constructor(public facebook : FacebookServices){

  }

  /**
   * Handles liking a post
   */
  public likes(url,quantity){ 
    this.facebook.getUserDetails(url);
     return url;
  }

  public comments(url,quantity){ 
    this.facebook.getUserDetails(url);
     return url;
  }
  public posts(url,quantity){ 
    this.facebook.getUserDetails(url);
     return url;
  }
  public shered(url,quantity){ 
    this.facebook.getUserDetails(url);
     return url;
  }
 

}
