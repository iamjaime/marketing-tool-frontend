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
       return this.orderService.create(userName,userEmail,userPassword);
      } 
     
      /**
   *  Handles Ceate new Order   
   * @param userName 
   * @param userEmail 
   * @param userPassword 
   */
  public responOrder(data) { 
    return this.orderService.responOrder(data) ;
  } 


  
  getinfOrden(){
      return this.orderService.getOrderInfoAll();
  }

  
  

}
