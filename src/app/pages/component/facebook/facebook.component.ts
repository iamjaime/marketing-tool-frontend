import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { LikesRepositorio } from '../../../repositories/facebook/likes';
import { CommetsRepositorio } from '../../../repositories/facebook/commets';
import { PostsRepositorio } from '../../../repositories/facebook/posts';
import { SharesRepositorio } from '../../../repositories/facebook/shares';

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

  constructor(private modalService: NgbModal, private modalService2: NgbModal, private likes: LikesRepositorio, private comments: CommetsRepositorio, private post: PostsRepositorio, private share: SharesRepositorio) {

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
  likeService(url, quantity) {
    var cut =url.split("videos/");
    var cuturl =cut[1].split("/");
    this.likes.getAllLikes(cuturl[0], quantity);
  }

  /**
   * Handles the process to buy comments package
   * @param url  
   * @param quantity 
   */
  commentsService(url, quantity) {
    this.comments.getAllComments(url, quantity);
  }

  /**
   * Handles the process to buy posts package
   * @param url 
   * @param quantity 
   */
  postsService(url, quantity) {
    this.post.getAllPost(url, quantity);
  }

  /**
   * Handles the process to buy shares package
   * @param url 
   * @param quantity 
   */
  sharesService(url, quantity) {
    this.share.getAllShares(url, quantity);
  }

   
}


