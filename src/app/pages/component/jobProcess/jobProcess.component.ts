import { Component,} from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../repositories/order/order';
import { FacebookRepository as Facebook } from '../../../repositories/facebook/facebook';
import swal from 'sweetalert2';

@Component({
  selector: 'app-basic',
  templateUrl: './jobProcess.component.html'
})
export class JobProcess { 
  private socket: io.Socket;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));
  type=[];
  buys=[];
  constructor(private order:Order,private orderservice:OrderService,private FB:Facebook ) {
		this.socket = io(environment.urls);
  }
  
  ngOnInit(){
    
      this.orderservice.getOrderInfoAll().then((result) => { 
      
         this.type =result.data;
         this.buys =result.data[0].orders;
       console.log(result );
        
      }); 
     
   }

   actionFacebook(url,id){
  
    this.FB.ui({ method: 'share', href: url }).then((response) => {
     
        if (response.error_message) {
          swal('Cancelled', 'Canceled job ', 'error');
        } else {
          swal('Successful!', 'Successful work, thank you for your trust', 'success');
          var PostData: any= {
            order_id :id,
            provider_id : 1,
            provider_account_id:this.facebook.id 
          }
           
          this.order.responOrder(PostData);
        //this.ngOnInit();
        }
      });
      
      var provider = this.getProvider(this.smi.attached_networks, 'Facebook'); 
      
    this.socket.emit('notification',this.smi.name,this.smi.name, this.smi.email, this.smi.photo, provider.traffic);
  }

  /**
   * Handles getting a specific provider from array of networks.
   *
   * @param array  networks  The array of attached_networks
   * @param string  provider  The provider name
   * @returns {any}
   */
  private getProvider(networks, provider){
    for(let i = 0; i < networks.length; i++){
      if(networks[i].provider.name == provider){
        return networks[i];
      }
    }
    return false;
  }
}
