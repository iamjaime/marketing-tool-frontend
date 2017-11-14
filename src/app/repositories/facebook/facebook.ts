import { Injectable } from '@angular/core';
import { LikeRepository } from '../../repositories/services/like';
import { CommentRepository } from '../../repositories/services/comment';
import { PostRepository } from '../../repositories/services/post';
import { ShareRepository } from '../../repositories/services/share'; 
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
   * @param url 
   * @param quantity 
   * @param type 
   */
  Processingurl(url,quantity,type){   
    var  option = url.match( 'videos/');  
    if(option){return this.getIdUrl(quantity,type,url,'videos/','/');}
 
    var  option = url.match( 'groups/'); 
    if(option){return this.getIdUrl(quantity,type,url,'groups/','/');}
 
    var  option = url.match( 'photos/a.'); 
    if(option){return this.getIdUrl(quantity,type,url,'photos/a.','.');} 
 
    var  option = url.match( 'events/');  
    if(option){return this.getIdUrl(quantity,type,url,'events/','/');}
 
   var  option = url.match( 'fbid=');  
   if(option){return this.getIdUrl(quantity,type,url,'fbid=','&');}
 
   var  option = url.match( 'id=');  
   if(option){ return this.getIdUrl(quantity,type,url,'id=','&');}
 
   var  option = url.match( 'comment_id=');  
   if(option){  return this.getIdUrl(quantity,type,url,'comment_id=','&');}
   
 }
 

  
/**
 * Handles  process to obtain the identification and data of Facebook
 * @param quantity 
 * @param action 
 * @param url 
 * @param filtro 
 * @param filtro2 
 */
getIdUrl(quantity,action,url,filtro,filtro2){
  var cut = url.split(filtro);
  var id = cut[1].split(filtro2);
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