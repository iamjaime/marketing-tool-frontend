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
    var  option = hyperlink.match( 'comment_id=');  
    if(option){  return this.getIdUrl(quantity,type,hyperlink,'comment_id=','&',0);}
      
    var  option = hyperlink.match( 'videos/');  
    if(option){return this.getIdUrl(quantity,type,hyperlink,'videos/','/',0);}
 
    var  option = hyperlink.match( 'groups/'); 
    if(option){return this.getIdUrl(quantity,type,hyperlink,'groups/','/',0);}
 
    var  option = hyperlink.match( 'photos/a.'); 
    if(option){return this.getIdUrl(quantity,type,hyperlink,'photos/a.','/',1);} 

   var  option = hyperlink.match( 'photos/p.'); 
    if(option){return this.getIdUrl(quantity,type,hyperlink,'photos/p.','/',1);} 

    var  option = hyperlink.match( 'events/');  
    if(option){return this.getIdUrl(quantity,type,hyperlink,'events/','/',0);}
 
   var  option = hyperlink.match( 'set=a.');  
   if(option){return this.getIdUrl(quantity,type,hyperlink,'set=a.','.',0);}
 
   var  option = hyperlink.match( 'id=');  
   if(option){ return this.getIdUrl(quantity,type,hyperlink,'id=','&',0);}
   
   
 }
 

  
/**
 * Handles  process to obtain the identification and data of Facebook
 * @param quantity 
 * @param action 
 * @param hyperlink 
 * @param fragment 
 * @param fragment2 
 */
getIdUrl(quantity,action,hyperlink,fragment,fragment2,position){
  var cut = hyperlink.split(fragment);
  var id = cut[1].split(fragment2);
  if(action==='likes'){
    this.likes.getAllLikes( id[position], quantity);
  }
  if(action==='comments'){
    this.comments.getAllComments(id[position], quantity);
  }  
  if(action==='post'){ 
    this.post.getAllPost(id[position], quantity);
  }
  if(action==='shere'){
    this.share.getAllShares(id[position], quantity);
  } 
 } 
} 