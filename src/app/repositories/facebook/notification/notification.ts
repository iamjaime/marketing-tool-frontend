import { notificationInterface } from '../../../contracts/facebook/notifiation/notification';
import swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { FacebookRepository as Facebook } from '../../../repositories/facebook/facebook';
import {environment} from  '../../../../environments/environment';

@Injectable()
export class NotificationRepository implements notificationInterface {
    private socket: any;

    data: any;
    informationSocket: any;
    like: any;
    userOnlines = [];
    smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
    public constructor(private FB: Facebook) {
       // this.socket = io(environment.urls);
    }

    /**
     * Handles send notification process
     * @param url
     */
    public sendNotification(url,id,idemit) {
        this.socket.emit('set-nickname',idemit,this.smi.name,this.smi.name,this.smi.avatar, 'si', url,id);
        this.socket.on('users-changed', (data) => { this.data = data; console.log(this.data); });
    }

    /**
     * Handles send notification process
     * @param url
     */
    public userOnline() {
        this.socket.emit('set-nickname',this.smi.name,this.smi.email,this.smi.avatar);
        this.socket.on('users-changed', (data) => {
            this.userOnlines.push(data);

            this.informationSocket = data;
            console.log(this.informationSocket.id);
            this.like = this.informationSocket.urls;
            if (this.informationSocket.evets === 'si') {

                if (sessionStorage.getItem('id') != this.informationSocket.id) {
                    this.alert();
                }
            }
        });

    }


    /**
     * Handles Launches alert

     */
    alert() {
        var urlPublic = this.like;
        swal({
            html:
           '<iframe src="https://www.facebook.com/plugins/post.php?href=' +
            urlPublic+'&width=500&show_text=false& = &height=497' +
            '"  width="100%"height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'+
          '<br><h1> new Job</h1>' + '<br>  <img src="' + this.informationSocket.photo
            + '"  style="width: 30px; height: 30px; border-radius: 150px; -webkit-border-radius: 150px; -moz-border-radius: 150px;" /><b> ' +
            this.informationSocket.user + '</b> <br>requested  1 ' + this.informationSocket.type
            + ' for $ 1 dollar',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ' Accept Work',
            cancelButtonText: 'Not Accept Work ',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,

        }).then(function (result) {
            if (result.value) {
                this.FB.ui(
                    {
                        method: 'share',
                        href: urlPublic,
                    },
                    function (response) {
                        if (response.error_message  ) {

                            swal('Cancelled',' you canceled the share ', 'error');
                        } else {
                            swal('success','   successful publication, you have deposited a dollar',  'success');
                        }
                    });
            } else if (result.dismiss === 'cancel') {
                swal('Cancelled', '  you canceled.job', 'error'
                );
            }
        })
    }

}
