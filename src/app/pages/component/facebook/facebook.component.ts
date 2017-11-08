import { Component, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: string;
  userName= sessionStorage.getItem('name');
  userEmail= sessionStorage.getItem('email');
  photo= sessionStorage.getItem('photo');
  constructor(private modalService: NgbModal, private modalService2: NgbModal) {} 

   /**
   * Handles package to buy
   */
   buy(type){
    swal.setDefaults({
      input: 'text', confirmButtonText: 'Next &rarr;', showCancelButton: true, progressSteps: ['1', '2']
    }) 
    var steps = [
      {
        title: type+ '<br>check url', text: 'Url Facebook',  inputPlaceholder: 'https://www.facebook.com/',
      },
      {
        title: 'check url',  text: 'Likes quantity', inputPlaceholder: 'quantity',
      } 
    ] 
    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      swal({
        title: 'pay package',
        html: 'Your answers: <pre>' + JSON.stringify(result) +  '</pre>',
        confirmButtonText: 'OK', showCancelButton: true 
      })
    }, function () {
      swal.resetDefaults()
    })
}
}


