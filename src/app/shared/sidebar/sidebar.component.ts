import { Component, AfterViewInit } from '@angular/core';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { User } from '../../repositories/user/user';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Helper } from '../../utils/helpers';

@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));

  //If we don't have facebook sessionStorage then empty object. Else JSON.parse the facebook object in storage.
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

  private socket: io.Socket;

	constructor(private FB: Facebook, public router: Router ,private user:User, private helper: Helper){
    this.socket = io(environment.urls);
  }

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

        //Check if already logged in to facebook
        this.checkIfLoggedInToFacebook();
    }


  /**
   * Handles logging out of facebook and also the facebook module
   * on our system
   */
  logoutFacebook(){
       this.FB.logout().then((res) => {
         sessionStorage.removeItem('facebook');
         this.router.navigate(['/login']);
       });
    }


    /**
     * session start navigation
     */
    navigateToStart() {
      this.user.createUserSocial();
        this.router.navigate(['/login']);

    }

    /**
     * login  for facebook
     */
    loginSocialFacebook() {
      this.FB.login()
        .then((response) => {
          if(response.status == "connected"){
            this.FB.getUser(response.authResponse.userID).then((res) => {
               console.log(res

               );
              var facebookData = {
                'id' : res.id,
                'name' : res.name,
                'email' : res.email,
                'photo' : res.picture.data.url,
                'friends_count' : res.friends.summary.total_count
              };
              sessionStorage.setItem('facebook', JSON.stringify(facebookData));

              this.navigateToStart();
            });
          }

        })
        .catch(e => console.error('Error logging in'));
    }


  /**
   * Handles Checking if the User is logged in to facebook.
   */
  checkIfLoggedInToFacebook() {
      this.FB.getLoginStatus().then((response) => {

        if(response.status == "connected" && this.facebook === {}){
          this.FB.getUser(response.authResponse.userID).then((res) => {

            var facebookData = {
              'id' : res.id,
              'name' : res.name,
              'email' : res.email,
              'photo' : res.picture.data.url,
              'friends_count' : res.friends.summary.total_count
            };

            sessionStorage.setItem('facebook', JSON.stringify(facebookData));

            this.navigateToStart();
          });
        }
      });
    }

  /**
   * Handles logging out of system.
   */
  logout() {
    this.socket.emit('set-discon', this.smi.name);
    this.socket.on('get-discon', (data) => {
      console.log(data);
    });

    if(!this.helper.isEmpty(this.facebook)){
      this.FB.logout().then((response) => {
        console.log(response);
        sessionStorage.removeItem('smi');
        this.router.navigate(['/login']);
      });
    }else{
      sessionStorage.removeItem('smi');
      this.router.navigate(['/login']);
    }
  }
}
