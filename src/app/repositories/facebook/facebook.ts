import { FacebookInterface } from '../../contracts/facebook/facebook';
import { Injectable } from '@angular/core';
import { FacebookService, UIParams, UIResponse, InitParams, LoginOptions } from 'ngx-facebook';
import { environment } from '../../../environments/environment';

@Injectable()
export class FacebookRepository implements FacebookInterface{

    public constructor(private fb: FacebookService) {
      this.init();
    }

  /**
   * Handles Initiating the Facebook SDK
   */
  private init(){

    let initParams: InitParams = {
        appId: environment.facebookID,
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.11'
      };

      this.fb.init(initParams);
  }

  /**
   * Handles the facebook login
   * @returns {Promise<LoginResponse>}
   */
  public login() {

    const options: LoginOptions = {
       scope: 'public_profile,user_friends,email,pages_show_list',
       return_scopes: true,
       enable_profile_selector: true
    };

    return this.fb.login(options);
  }

  /**
   * Handles Logging the user out of facebook.
   * @returns {Promise<any>}
   */
  public logout() {
    return this.fb.logout();
  }

  /**
   * Handles Getting the Facebook Login Status
   * @returns {Promise<LoginStatus>}
   */
  public getLoginStatus(){
    return this.fb.getLoginStatus();
  }

  /**
   * Handles sending a request to the facebook API
   * @param path
   * @param method
   * @param params
   * @returns {Promise<any>}
   */
  public api(path, method, params){
    return this.fb.api(path, method, params);
  }

  /**
   * Handles using the facebook ui dialogs
   * @param params
   * @returns {Promise<UIResponse>}
   */
  public ui(params) {
    return this.fb.ui(params);
  }


  /**
   * Handles getting a Facebook User's Details
   * @param userId
   * @returns {Promise<any>}
   */
  public getUser(userId){
    return this.api('/' + userId, 'get', { "fields": "name,email,picture,first_name,last_name,friends,currency,address" });
  }

  /**
   * Handles Getting Facebook Likes
   * @param id
   * @returns {Promise<any>}
   */
  public getLikes(id) {
   return this.api('/' + id,'get', { "fields": "likes" });
  }

  /**
   * Handles getting facebook user shared posts
   * @param id
   * @returns {Promise<any>}
   */
  public getSharedPosts(id) {
    return this.api('/' + id, 'get', {"fields":"sharedposts"});
  }

  /**
   * Handles getting Comments
   * @param id
   * @returns {Promise<any>}
   */
  public getComments(id) {
    return this.api('/' + id, 'get', { "fields":"comments" });
  }

}
