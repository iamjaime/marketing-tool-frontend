import { Component, AfterViewInit } from '@angular/core';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { Router } from '@angular/router';
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements AfterViewInit {
    userName= sessionStorage.getItem('name');
    userEmail= sessionStorage.getItem('email');
    photo= sessionStorage.getItem('photo');

	tokenF= sessionStorage.getItem('ftoken');
	fname=sessionStorage.getItem('fname' );
	femail= sessionStorage.getItem('femail' );
	fphoto=sessionStorage.getItem('fphoto' );
	friends=sessionStorage.getItem('ffriends' ); 
	constructor(private FB: Facebook, public router: Router, ){}

    ngAfterViewInit() {
        $(function () {
            var url = window.location.toString();
            var element = $('ul#sidebarnav a').filter(function () {
                let a = <HTMLAnchorElement>this;
                return (a.href == url ? true : false);
            }).addClass('active').parent().addClass('active');
            while (true) {
                if (element.is('li')) {
                    element = element.parent().addClass('in').parent().addClass('active');
                }
                else {
                    break;
                }
            }

            (<any>$('#sidebarnav')).metisMenu();
        });
    }
    logoutFacebook(){
         sessionStorage.removeItem('ftoken');
       sessionStorage.removeItem('fname' );
        sessionStorage.removeItem('femail' );
        sessionStorage.removeItem('fphoto' );
         sessionStorage.removeItem('ffriends' ); 
         this.router.navigate(['/login']);

    }


    /**
     * session start navigation
     */
    navigateToStart() {
        this.router.navigate(['/login']);
 
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
             this. navigateToStart();
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
                  this. navigateToStart();
                   
                });
              }

            })
            .catch(e => console.error('Error logging in'));
        }
      });

    } 
}
