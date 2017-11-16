import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map'; 
import { FacebookRepository } from '../../../repositories/facebook/facebook'; 
import { FacebookSocket } from '../../../repositories/facebook/socket';
import * as io from 'socket.io-client';
import swal from 'sweetalert2';
declare const FB: any;
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
  private socket: SocketIOClient.Socket;
  private urls = 'http://localhost:3001';
  cut:any;
  constructor(private modalService: NgbModal, private modalService2: NgbModal,private facebook:FacebookRepository) {
    this.socket = io(this.urls);
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

  /**
   * Handles send notification 
   * @param url 
   * @param quantity 
   */
  alert1(url, quantity) {
    this.socket.emit('set-nickname',sessionStorage.getItem('id'),sessionStorage.getItem('name'),sessionStorage.getItem('photo'),'si',  url,"like" );
    this.socket.on('users-changed', (data) => {  this.cut= data;  console.log(this.cut);  });
   

}
}


