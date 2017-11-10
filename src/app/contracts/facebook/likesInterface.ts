/**
 * Created by codehead on 11/9/17.
 */
export interface likesInterface {

  /**
   * Handles Liking A Post
   */
  likePost (url: String) : String;


  /**
   * Handles Liking A Photo
   */
  likePhoto() : any;


  /**
   * Handles Liking A Page
   */
  likePage() : any;


  /**
   * Handles Liking A Video
   */
  likeVideo() : any;
}
