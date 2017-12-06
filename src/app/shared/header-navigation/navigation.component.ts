import { Component, AfterViewInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from "angular4-social-login";
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { User } from '../../repositories/user/user';
import swal from 'sweetalert2';
import { Helper } from '../../utils/helpers';

@Component({
    selector: 'ap-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

    showHide: boolean;
    smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
    facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));
    myUser=[];
    private socket: io.Socket;
    userOnline = [];

    constructor(private authService: AuthService, private router: Router, private FB: Facebook, private helper : Helper, private  user: User) {
        this.showHide = true;
        this.socket = io(environment.urls);
    }

    public ngOnInit() {
        //this.user.refreshInformation() ;
        this.user.getUserInfo().then((result)=>{ 
            console.log(result.data.credits);
            this.myUser = result.data.credits;
          });
        this.socket.on('get-refresh-data', (data) => {
			if (data.data === 'refres') {
                this.user.refreshInformation();
                this.user.getUserInfo().then((result)=>{ 
                    console.log(result.data.credits);
                    this.myUser = result.data.credits;
                  });
                 
        }});

        this.socket.emit('set-nickname', this.smi.name, this.smi.email, this.smi.photo);
        this.socket.on('users-changed', (data) => {
            if (data.evets === 'si') {
                if (this.smi.name != data.id) {
                    this.userOnline.push(data);
                }
            }
        });
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




    actionFacebook(link,user){
      this.FB.ui({ method: 'share', href: link }).then((response) => {
          if (response.error_message) {
            swal('Cancelled', 'Canceled job ', 'error');
          } else {
            swal('Successful!', 'Successful work, thank you for your trust', 'success');
          }
        });

      var provider = this.getProvider(this.smi.attached_networks, 'Facebook');

      this.socket.emit('notification',user,this.smi.name, this.smi.email, this.smi.photo, provider.traffic);
    }


    changeShowStatus() {
        this.showHide = !this.showHide;
    }

    ngAfterViewInit() {

        $(function () {
            $(".preloader").fadeOut();
        });

        var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".sidebartoggler i").addClass("ti-menu");
            } else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }

            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }

        };
        $(window).ready(set);
        $(window).on("resize", set);

        $(document).on('click', '.mega-dropdown', function (e) {
            e.stopPropagation();
        });

        $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
            $(".app-search").toggle(200);
        });

        (<any>$('.scroll-sidebar, .right-sidebar, .message-center')).perfectScrollbar();

        $("body").trigger("resize");
    }


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
