import { OrderInterface } from '../../contracts/order/orderInterface';
import { Injectable } from '@angular/core';
import { OrderService } from '../../services/order/order.service'
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Order implements OrderInterface {
  result:any;
  public constructor(public orderService : OrderService,private toastr: ToastrService){

  } 

  /**
   *  Handles Ceate new Order   
   * @param userName 
   * @param userEmail 
   * @param userPassword 
   */
  public create( userName,userEmail,userPassword) { 
        this.orderService.create(userName,userEmail,userPassword).subscribe((response  )=> {
            this.result = response.json(); 
            this.toastr.success('Successful', ' Orders'); 
        },
        err => {
            this.result =err.json();
            this.toastr.error ('Error', '  Orders '); 
        }); 
      } 
     
      /**
   *  Handles Ceate new Order   
   * @param userName 
   * @param userEmail 
   * @param userPassword 
   */
  public responOrder(data) { 
    this.orderService.responOrder(data).subscribe((response  )=> {
        //this.result = response.json(); 
        //this.toastr.success('Successful', ' Orders'); 
        console.log(response);
    },
    err => {
       // this.result =err.json();
        //this.toastr.error ('Error', '  Orders '); 
    }); 
  } 
 
}
