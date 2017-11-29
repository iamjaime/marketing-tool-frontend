import { Component,OnInit  } from '@angular/core';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { Router } from '@angular/router';

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent  {
	subtitle:string;
	tokenF= sessionStorage.getItem('ftoken');
	fname=sessionStorage.getItem('fname' );
	femail= sessionStorage.getItem('femail' );
	fphoto=sessionStorage.getItem('fphoto' );
	friends=sessionStorage.getItem('ffriends' ); 
	constructor(private FB: Facebook, public router: Router, ) {
		this.subtitle = "This is some text within a card block."
	}
	ngOnInit(){
 
  } 
  
    /**
     * session start navigation
     */
    navigateToStart() {
        this.router.navigate(['/facebook']);
 
    }

    /**
     * login  for facebook
     */
    loginSocialFacebook() {

      this.FB.getLoginStatus().then((response) => {
        console.log(response);
        if(response.status == "connected"){
          sessionStorage.setItem('id', response.authResponse.accessToken);

          this.FB.getUser(response.authResponse.userID).then((res) => { 
            sessionStorage.setItem('ftoken', res.id);
             sessionStorage.setItem('fname', res.name);
             sessionStorage.setItem('femail', res.email);
             sessionStorage.setItem('fphoto', res.picture.data.url);
             sessionStorage.setItem('ffriends', res.friends.summary.total_count ); 
             this.router.navigate(['/facebook']);
          });
        }else{
          this.FB.login()
            .then((response) => {
              console.log(response);
              if(response.status == "connected"){
                sessionStorage.setItem('id', response.authResponse.accessToken);
                sessionStorage.setItem('loggedInType', 'facebook');
                this.FB.getUser(response.authResponse.userID).then((res) => {
                  sessionStorage.setItem('ftoken', res.id);
                  sessionStorage.setItem('fname', res.name);
                  sessionStorage.setItem('femail', res.email);
                  sessionStorage.setItem('fphoto', res.picture.data.url); 
                  sessionStorage.setItem('ffriends', res.friends.summary.total_count );
				  this.router.navigate(['/facebook']);
                   
                });
              }

            })
            .catch(e => console.error('Error logging in'));
        }
      });

    } 
	
}