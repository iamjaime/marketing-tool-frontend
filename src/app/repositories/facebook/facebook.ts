import { Injectable } from '@angular/core';
import { LikeRepository } from '../facebook/services/like';
import { CommentRepository } from '../facebook/services/comment';
import { PostRepository } from '../facebook/services/post';
import { ShareRepository } from '../facebook/services/share'; 
import { facebookInterface } from '../../contracts/facebook/facebook';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';

declare const FB: any;
@Injectable()
export class FacebookRepository implements facebookInterface {

    public constructor( private likes: LikeRepository, private comments: CommentRepository, private post: PostRepository, private share: ShareRepository,private fb: FacebookService) {
      let initParams: InitParams = { appId: '531968097138866', xfbml: true, version: 'v2.10' };
      this.fb.init(initParams);
      

    }

      /**
   * Handles process to get the type of url
   * @param hyperlink 
   * @param quantity 
   * @param type 
   */
  parseUrl(hyperlink,quantity,type){   
    var  option = hyperlink.match( 'videos/');  
    if(option){return this.getIdUrl(quantity,type,hyperlink,'videos/','/');}
 
    var  option = hyperlink.match( 'groups/'); 
    if(option){return this.getIdUrl(quantity,type,hyperlink,'groups/','/');}
 
    var  option = hyperlink.match( 'photos/a.'); 
    if(option){return this.getIdUrl(quantity,type,hyperlink,'photos/a.','.');} 
 
    var  option = hyperlink.match( 'events/');  
    if(option){return this.getIdUrl(quantity,type,hyperlink,'events/','/');}
 
   var  option = hyperlink.match( 'fbid=');  
   if(option){return this.getIdUrl(quantity,type,hyperlink,'fbid=','&');}
 
   var  option = hyperlink.match( 'id=');  
   if(option){ return this.getIdUrl(quantity,type,hyperlink,'id=','&');}
 
   var  option = hyperlink.match( 'comment_id=');  
   if(option){  return this.getIdUrl(quantity,type,hyperlink,'comment_id=','&');}
   
 }
 

  
/**
 * Handles  process to obtain the identification and data of Facebook
 * @param quantity 
 * @param action 
 * @param hyperlink 
 * @param fragment 
 * @param fragment2 
 */
getIdUrl(quantity,action,hyperlink,fragment,fragment2){
  var cut = hyperlink.split(fragment);
  var id = cut[1].split(fragment2);
  if(action==='likes'){
    this.likes.getAllLikes( id[0], quantity);
  }
  if(action==='comments'){
    this.comments.getAllComments(id[0], quantity);
  }  
  if(action==='post'){ 
    this.post.getAllPost(id[0], quantity);
  }
  if(action==='shere'){
    this.share.getAllShares(id[0], quantity);
  } 
 } 
} 