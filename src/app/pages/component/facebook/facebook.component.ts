import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
 
import { LikeRepository } from '../../../repositories/facebook/like';
import { CommentRepository } from '../../../repositories/facebook/comment';
import { PostRepository } from '../../../repositories/facebook/post';
import { ShareRepository } from '../../../repositories/facebook/share';
 
@Component({
  selector: 'ngbd-modal',
  templateUrl: './facebook.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #028ee1;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})

export class FacebookComponent {
  userName = sessionStorage.getItem('name');
  userEmail = sessionStorage.getItem('email');
  photo = sessionStorage.getItem('photo');
  public action: any;
  closeResult: string;
  fragment:any;

  constructor(private modalService: NgbModal, private modalService2: NgbModal, private likes: LikeRepository, private comments: CommentRepository, private post: PostRepository, private share: ShareRepository) {

  }

  /**
   * Handles typo de Model
   * @param content 
   */
  open2(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  /**
   * Handles the process to buy likes package
   * @param url 
   * @param quantity 
   */
  likeService(url, quantity,) { 
   this.Processingurl(url,quantity,'likes'); 
  }

  /**
   * Handles the process to buy comments package
   * @param url  
   * @param quantity 
   */
  commentsService(url, quantity) {
    this.Processingurl(url,quantity,'comments');  
  }

  /**
   * Handles the process to buy posts package
   * @param url 
   * @param quantity 
   */
  postsService(url, quantity) {
    this.Processingurl(url,quantity,'post'); 
    
  }

  /**
   * Handles the process to buy shares package
   * @param url 
   * @param quantity 
   */
  sharesService(url, quantity) {
    this.Processingurl(url,quantity,'shere'); 
   
  }
  /**
   * Handles process to get the type of url
   * @param url 
   * @param quantity 
   * @param type 
   */
  Processingurl(url,quantity,type){   
   var  option = url.match( 'videos/');  
   if(option){ this.getIdUrl(quantity,type,url,'videos/','/');}

   var  option = url.match( 'groups/'); 
   if(option){ this.getIdUrl(quantity,type,url,'groups/','/');}

   var  option = url.match( 'photos/a.'); 
   if(option){ this.getIdUrl(quantity,type,url,'photos/a.','.');} 

   var  option = url.match( 'events/');  
   if(option){ this.getIdUrl(quantity,type,url,'events/','/');}

  var  option = url.match( 'fbid=');  
  if(option){ this.getIdUrl(quantity,type,url,'fbid=','&');}

  var  option = url.match( 'id=');  
  if(option){ this.getIdUrl(quantity,type,url,'id=','&');}

  var  option = url.match( 'comment_id=');  
  if(option){ this.getIdUrl(quantity,type,url,'comment_id=','&');}
  
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


