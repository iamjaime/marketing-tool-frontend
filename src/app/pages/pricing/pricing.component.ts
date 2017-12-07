import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-pricing',
  templateUrl: 'pricing.component.html',
  styleUrls: ['pricing.component.css']
})
export class PricingComponent implements OnInit {

  constructor(public toastr: ToastrService) { }

  ngOnInit() {
  }
  openCheckout(money){
 
     var handler = (<any>window).StripeCheckout.configure({
       key: 'pk_test_xVm9D2LoAEUtBlNADEqA5ctt',
       locale: 'auto',
       token:   function (token: any) {
           console.log(token);
          
         
            
        
       }
     });
 
     handler.open({
       name: 'Social Media',
       description: 'buy credits',
      image:"../assets/images/logo-icon.png",
      //bitcoin:"true", 
      label:"Pay with Card or Bitcoin", 
      amount: money,
      currency: "usd" 
     });
 
   }
  public aler(){
    this.toastr.info('successful purchase','money: '  );
  }

}
