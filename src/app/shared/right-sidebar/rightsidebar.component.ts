import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import swal from 'sweetalert2';
import { FacebookSocket } from '../../repositories/facebook/socket';
declare const FB: any;

@Component({
	selector: 'ap-rightsidebar',
	templateUrl: './rightsidebar.component.html'
})

export class RightSidebarComponent {
	private socket: SocketIOClient.Socket;
	private urls = 'http://localhost:3001';
	userName = sessionStorage.getItem('name');
	userEmail = sessionStorage.getItem('email');
	photo = sessionStorage.getItem('photo');
	informationSocket: any;
	public like: any;
	userOnline=[];
	constructor() {
		this.socket = io(this.urls);
	}

	ngOnInit() { 
		this.socket.emit('set-nickname', sessionStorage.getItem('name'), sessionStorage.getItem('email'), sessionStorage.getItem('photo'));
		this.socket.on('users-changed', (data) => {
			this.userOnline.push(data);
			console.log(data);
			this.informationSocket = data;
			this.like = this.informationSocket.urls;
			if (this.informationSocket.evets === 'si') {
		 
				if (sessionStorage.getItem('id') != this.informationSocket.id) {
				 
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
							FB.ui(
								{
									method: 'share',
									href: d,
								},
							 
								function (response) {
									if (response && !response.error_message) { 
										swal( 	'Deleted!', 'Your file has been deleted.', 'success' )
									} else {
										swal( 	'Cancelled', 'Your imaginary file is safe :)', 'error' )
									}
								}); 
						} else if (result.dismiss === 'cancel') { 
							swal( 'Cancelled', 'Your imaginary file is safe :)', 'error'
							)
						}
					})
				}
			}
		}); 
	}
}
