import { Component, AfterViewInit } from '@angular/core';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { User } from '../../repositories/user/user';
import { Router } from '@angular/router'; 
import { environment } from '../../../environments/environment';
import { Helper } from '../../utils/helpers';
import { Socket } from 'ng-socket-io';
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent   {

  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  myUser : any=[];
  photo:any =[];
  //If we don't have facebook sessionStorage then empty object. Else JSON.parse the facebook object in storage.
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

  

	constructor(private FB: Facebook, public router: Router ,private user:User, private helper: Helper , private socket : Socket){
  //  this.socket = io(environment.urls);
  }
ngOnInit(){
  this.user.getUserInfo().then((result) => {
    var resul= JSON.stringify(result);
    var res = JSON.parse(resul); 
    console.log(res.data);
    this.myUser = res.data;
    if (res.data.avatar) {

      this.photo = res.data.avatar;
    }
    else {
      this.photo = 'assets/images/users/1.jpg';
    }  
  });
  this.socket.on('get-refresh-data', (data) => {
    if (data.data === 'refresh') {
      this.user.refreshInformation();
      this.user.getUserInfo().then((result) => {
        var resul= JSON.stringify(result);
        var res = JSON.parse(resul); 
       console.log(res.data);
        this.myUser = res.data;
        if (res.data.avatar) {

          this.photo = res.data.avatar;
        }
        else {
          this.photo = 'assets/images/users/1.jpg';
        } 
      });

    }
  });
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

         sessionStorage.removeItem('facebook');
        this.router.navigate(['/login']);

    }


    /**
     * session start navigation
     */
    navigateToStart() {
      this.router.navigate(['/login']);
    }


  /**
   * Handles attaching the facebook social account.
   */
  private attachFacebookSocialAccount(provider_id, provider_account_id, provider_traffic)
  {
    //Facebook is provider id 1 (for now)
    this.user.attachNetwork(provider_id, provider_account_id, provider_traffic).then((res) => {
      //Success!
      console.log(res);
      this.user.getUserInfo().then((results) => {
        var resul= JSON.stringify(results);
        var res = JSON.parse(resul); 
        console.log(res);
        res.data.token = this.smi.token;
        if(!res.data.avatar) {
          res.data.avatar = 'assets/images/users/1.jpg';
        }
        console.log(results);
      sessionStorage.setItem('smi', JSON.stringify(res.data)); 
      });

    }, (err) => {
      //console.log(err);
      this.user.getUserInfo().then((results) => {
        var resul= JSON.stringify(results);
        var res = JSON.parse(resul); 
        console.log(results);
        res.data.token = this.smi.token;
        if(!res.data.avatar) {
          res.data.avatar = 'assets/images/users/1.jpg';
        }
        console.log(results);
        sessionStorage.setItem('smi', JSON.stringify(res.data)); 
      });
    });
  }

    /**
     * login  for facebook
     */
    loginSocialFacebook() {
      this.FB.login()
        .then((response) => {
          console.log(response);
       var tokenFace = response.authResponse.accessToken;

         //sessionStorage.setItem(  'token', tokenFace);
          if(response.status == "connected"){
            this.FB.getUser(response.authResponse.userID).then((res) => {

              var facebookData = {
                'id' : res.id,
                'name' : res.name,
                'email' : res.email,
                'photo' : res.picture.data.url,
                'friends_count' : res.friends.summary.total_count

              };

              console.log(facebookData);
              sessionStorage.setItem('facebook', JSON.stringify(facebookData));


             this.attachFacebookSocialAccount('1',facebookData.id, facebookData.friends_count);
              this.navigateToStart();
            });
          }

        })
       // .catch(e => console.error('Error logging in'));
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
    });

    sessionStorage.removeItem('facebook');
    sessionStorage.removeItem('smi');
    sessionStorage.removeItem('sm');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
