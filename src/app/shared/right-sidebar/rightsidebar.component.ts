import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';


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

	constructor(private FB: Facebook) {
		this.socket = io(environment.urls);
	}

	public ngOnInit() {
		this.socket.on('users-notification', (data) => {
			if (data.id === sessionStorage.getItem('name')) {
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
			}
		});
		this.socket.emit('set-nickname', this.smi.name, this.smi.email, this.smi.photo);
		this.socket.on('users-changed', (data) => {



			this.userOnline = data.s;
			console.log(this.userOnline);

			this.informationSocket = data;
			this.like = this.informationSocket.urls;
			if (this.informationSocket.evets === 'si') {

				if (this.smi.name != this.informationSocket.id) {

					var d = this.like;
					swal({

						html: '<h1> new Job</h1>' + '<br>  <img src="' + this.informationSocket.photo
						+ '"  style="width: 30px; height: 30px; border-radius: 150px; -webkit-border-radius: 150px; -moz-border-radius: 150px;" /><b> ' +
						this.informationSocket.user + '</b> <br>requested  1 ' + this.informationSocket.type
						+ ' for $ 1 dollar',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'yes',
						cancelButtonText: 'No ',
						confirmButtonClass: 'btn btn-success',
						cancelButtonClass: 'btn btn-danger',
						buttonsStyling: false
					}).then(function (result) {
						if (result.value) {
							/*	FB.ui({
									method: 'share_open_graph',
									action_type: 'og.shares',
									action_properties: JSON.stringify({
										object: {
											'og:url': d,
											'og:title': 'facbook hakeado  ',
											'og:description': 'sigues tu  :) ',
											'og:image': 'http://queandandiciendo.com/wp-content/uploads/3CF5F32D00000578-4203818-image-a-30_1486562764357.jpg'
										}
									})
								}, */
							this.FB.ui(
								{
									method: 'share',
									href: d,
								},

								function (response) {
									if (response.error_message) {
										swal('Cancelled', 'Canceled job ', 'error')
									} else {

										swal('Successful!', 'Successful work, thank you for your trust', 'success')
									}
								});
						} else if (result.dismiss === 'cancel') {
							swal('Cancelled', 'canceled job', 'error'
							)
						}
					})
				}
			}
		});
	}
}
