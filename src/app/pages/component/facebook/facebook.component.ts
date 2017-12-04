import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import { FacebookRepository } from '../../../repositories/facebook/facebook';
import { OrderService } from '../../../services/order/order.service';
import { NotificationRepository } from '../../../repositories/facebook/notification/notification';
import { Order } from '../../../repositories/order/order';
import swal from 'sweetalert2';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { User } from '../../../repositories/user/user';

@Component({
  selector: 'ngbd-modal',
  templateUrl: './facebook.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./facebook.component.scss']
})

export class FacebookComponent {

  userName = sessionStorage.getItem('name');
  userEmail = sessionStorage.getItem('email');
  photo = sessionStorage.getItem('photo');
  private socket: io.Socket;
  public action: any;
  type=[];
  buys=[];
  myUser:any;
  constructor(private modalService: NgbModal, private facebook:FacebookRepository,private notification:NotificationRepository ,private order:Order,private orderservice:OrderService,private user:User) {
		this.socket = io(environment.urls);
  }
 ngOnInit(){
 
    this.orderservice.getOrderInfo().then((result) => { 
      console.log(result);
       this.type =result.data;
       this.buys =result.data[0].orders;
 
    }); 
    this.user.getUserInfo().then((result)=>{ 
      console.log(result.data.credits);
      this.myUser = result.data.credits;
    });
  
 }
  /**
   * Handles Opening A Modal
   * @param content The Name of the Modal Template
   */
  openModal(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  
  /**
   * Handles the process to begin sharing a facebook post
   * @param url
   */
  beginSharing(url,quantity) {
    
    if(url && quantity){
      this.order.create(this.userName,url,quantity); 
      this.notification.sendNotification(url);
      swal('Success ',  'Your Order Has Been Placed', 'success');
      this.socket.emit('set-refresh-data','refres');
      //this.ngOnInit();
    }else{
      swal('error ', 'Facebook Post URL is required',  'error');
    }
  }

  /**
  * Handles the process to buy shares package
  * @param url
  * @param quantity
  */
 verifyUrl(url) {
   if(url){
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


}


