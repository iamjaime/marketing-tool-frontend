import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Likes } from '../../../repositories/facebook/likes';

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
  constructor(private modalService: NgbModal, private modalService2: NgbModal, private likes: Likes) {

  }

  /**
  * Handles package to buy
  */
  open2(content) {
    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }

  likeService(url,quantity ){ 
    this.likes.likes(url,quantity);
  }
  commentsService(url,quantity ){ 
    this.likes.comments(url,quantity);
  }
  postService(url,quantity ){ 
    this.likes.posts(url,quantity);
  }
  sheredService(url,quantity ){ 
    this.likes.shered(url,quantity);
  }




}


