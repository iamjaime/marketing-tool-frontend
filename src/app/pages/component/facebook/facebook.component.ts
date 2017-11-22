import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map'; 
import { FacebookRepository } from '../../../repositories/facebook/facebook'; 
import { NotificationRepository } from '../../../repositories/facebook/notification/notification';   
import swal from 'sweetalert2';
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
  buy=[];
 
  constructor(private modalService: NgbModal, private facebook:FacebookRepository,private notification:NotificationRepository) {
 
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
   * Handles the process to buy shares package
   * @param url
   */
  sharesService(url) {
    this.buy.push(url);
    if(url){ 
      this.notification.sendNotification(url);
      swal('success ',  'send Notification ', 'success')
    }else{
      swal('error ', 'Url is required',  'error')
    }
    
  } 
  
  /**
  * Handles the process to buy shares package
  * @param url 
  * @param quantity 
  */
 verificateUrl(url) {  
  swal({
    
      html:'<iframe src="https://www.facebook.com/plugins/post.php?href=' +
      url+ '&width=500&show_text=false& = &height=497' +
      '"  width="100%"height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>' +
      '<br>  <img src="' + this.photo
      +
      '"  style="width: 30px; height: 30px; border-radius: 150px; -webkit-border-radius: 150px; -moz-border-radius: 150px;" /><b> ' +
      this.userName+'</b> <br>requested  1 ' +' for $ 1 dollar',

      confirmButtonText: 'Cancel',

      showLoaderOnConfirm: true,



    })
 } 

  
}


