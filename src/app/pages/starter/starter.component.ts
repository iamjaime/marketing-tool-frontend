import { Component,OnInit  } from '@angular/core';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { Router } from '@angular/router';

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent  {

  subtitle:string;

	constructor(private FB: Facebook, public router: Router, ) {

	}
	ngOnInit(){
 
  } 

}
