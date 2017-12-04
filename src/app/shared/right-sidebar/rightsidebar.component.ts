 
import { Component, AfterViewInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from "angular4-social-login";
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { FacebookRepository } from '../../repositories/facebook/facebook';
import swal from 'sweetalert2';
import { Helper } from '../../utils/helpers';


@Component({
	selector: 'ap-rightsidebar',
	templateUrl: './rightsidebar.component.html'
})

export class RightSidebarComponent {
	private socket: io.Socket;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

	userName = this.smi.name;
	userEmail = this.smi.email;
	photo = this.smi.photo;

	public informationSocket: any;
	public like: any;
	public userOnline: any;

	constructor(private FB: FacebookRepository) {
		this.socket = io(environment.urls);
	}

	public ngOnInit() {
		this.socket.on('users-notification', (data) => {
		 
				console.log(data);
				swal({
					title: data.user,
					text: 'do the job correctly',
					imageUrl: data.photo,
					imageWidth: 400,
					imageHeight: 200,
					imageAlt: 'Custom image',
					animation: false
				})
		 
		});
		this.socket.emit('set-nickname', this.smi.name, this.smi.email, this.smi.photo);
		this.socket.on('users-changed', (data) => { 

			this.informationSocket = data;
			this.like = this.informationSocket.urls;
			 
			if (this.informationSocket.evets === 'si') {

				if (this.smi.name != this.informationSocket.id) {

					var d = this.like;
					
					this.FB.ui({ method: 'share', href: d }).then((response) => {
						
						   if (response.error_message) {
							 swal('Cancelled', 'Canceled job ', 'error');
						   } else {
							 swal('Successful!', 'Successful work, thank you for your trust', 'success');
							 
						   }
						 });
				}
			}
		});
	}
}
