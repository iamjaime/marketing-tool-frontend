export interface FacebookInterface {

/**
 * Handles the facebook login
 * @returns {Promise<LoginResponse>}
 */
  login() : Promise<any>;

/**
 * Handles Logging the user out of facebook.
 * @returns {Promise<any>}
 */
  logout() : Promise<any>;

/**
 * Handles Getting the Facebook Login Status
 * @returns {Promise<LoginStatus>}
 */
  getLoginStatus() : Promise<any>;

/**
 * Handles sending a request to the facebook API
 * @param path
 * @param method
 * @param params
 * @returns {Promise<any>}
 */
  api(path : string, method, params : string) : Promise<any>;

/**
 * Handles using the facebook ui dialogs
 * @param params
 * @returns {Promise<UIResponse>}
 */
  ui(params : any) : Promise<any>;

/**
 * Handles getting a Facebook User's Details
 * @param userId
 * @returns {Promise<any>}
 */
  getUser(userId : string) : Promise<any>;

/**
 * Handles Getting Facebook Likes
 * @param id
 * @returns {Promise<any>}
 */
  getLikes(id : string) : Promise<any>;

/**
 * Handles getting facebook user shared posts
 * @param id
 * @returns {Promise<any>}
 */
  getSharedPosts(id : string) : Promise<any>;

/**
 * Handles getting Comments
 * @param id
 * @returns {Promise<any>}
 */
  getComments(id : string) : Promise<any>;

}
