import { Component,OnInit  } from '@angular/core';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { Router } from '@angular/router';
import { User } from '../../repositories/user/user'

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent  {

 
 myUser:any;
	constructor(private FB: Facebook, public router: Router, private user: User ) {

	}
	ngOnInit(){
		this.user.getUserInfo().then((result)=>{ 
			this.myUser = result.data;
		});
  } 

}
