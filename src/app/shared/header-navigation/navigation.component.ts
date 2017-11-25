import { Component, AfterViewInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from "angular4-social-login";
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import swal from 'sweetalert2';

@Component({
    selector: 'ap-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
    name: string;
    showHide: boolean;
    userName = sessionStorage.getItem('name');
    userEmail = sessionStorage.getItem('email');
    photo = sessionStorage.getItem('photo');
    private socket: io.Socket;
    public informationSocket = [];
    userOnline = [];

    constructor(private authService: AuthService, private router: Router, private FB: Facebook) {
        this.showHide = true;
        this.socket = io(environment.urls);
    }

    public ngOnInit() {
        this.socket.emit('set-nickname', sessionStorage.getItem('name'), sessionStorage.getItem('email'), sessionStorage.getItem('photo'));
        this.socket.on('users-changed', (data) => {
            if (data.evets === 'si') {
                if (sessionStorage.getItem('name') != data.id) {
                    this.userOnline.push(data);
                }
            }
        });
    }

    actionFacebook(link,user){
      this.FB.ui({ method: 'share', href: link }).then((response) => {
          if (response.error_message) {
            swal('Cancelled', 'Canceled job ', 'error');
          } else {
            swal('Successful!', 'Successful work, thank you for your trust', 'success');
          }
        });

      this.socket.emit('notification',user,sessionStorage.getItem('name'), sessionStorage.getItem('email'), sessionStorage.getItem('photo'),sessionStorage.getItem('friends'));
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
        this.socket.emit('set-discon', sessionStorage.getItem('name'));
        this.socket.on('get-discon', (data) => {
            console.log(data);
        });
        if(sessionStorage.getItem('facebook')){
          this.FB.logout().then((response) => {
            console.log(response);
            sessionStorage.clear();
            sessionStorage.removeItem('token');
            this.router.navigate(['/login']);
          });
        }else{
          sessionStorage.clear();
          sessionStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
    }
}
