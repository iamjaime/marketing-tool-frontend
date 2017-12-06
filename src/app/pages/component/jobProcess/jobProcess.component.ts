import { Component,} from '@angular/core';
 import { Router } from '@angular/router';

@Component({
  selector: 'app-basic',
  templateUrl: './jobProcess.component.html'
})
export class JobProcess { 
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

  constructor( private router:Router ) {
 
  }
  
  ngOnInit(){
    if( this.facebook.id ){}
    else{
      this.router.navigate(['/starter']);
    }
     
   }
 
}
