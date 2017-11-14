import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
 
import { FacebookRepository } from '../../../repositories/facebook/facebook';
 
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

  constructor(private modalService: NgbModal, private modalService2: NgbModal,private facebook:FacebookRepository) {

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
    this.facebook.parseUrl(url,quantity,'likes'); 
  }

  /**
   * Handles the process to buy comments package
   * @param url  
   * @param quantity 
   */
  commentsService(url, quantity) {
    this.facebook.parseUrl(url,quantity,'comments');  
  }

  /**
   * Handles the process to buy posts package
   * @param url 
   * @param quantity 
   */
  postsService(url, quantity) {
    this.facebook.parseUrl(url,quantity,'post'); 
    
  }

  /**
   * Handles the process to buy shares package
   * @param url 
   * @param quantity 
   */
  sharesService(url, quantity) { 
    this.facebook.parseUrl(url,quantity,'shere') ;
   
  }
 
}


