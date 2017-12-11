import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Order } from '../../repositories/order/order'; 
import { FacebookRepository as Facebook } from '../../repositories/facebook/facebook';
import { ToastrService } from 'ngx-toastr'; 
import swal from 'sweetalert2'; 


//declare const FB:any;
@Component({
	selector: 'ap-rightsidebar',
	templateUrl: './rightsidebar.component.html'
})

export class RightSidebarComponent {
	private socket: any;
  smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
  facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));

	userName = this.smi.name;
	userEmail = this.smi.email;
	photo = this.smi.photo;

	public informationSocket: any;
	public like: any;
	public userOnline: any;

	constructor(private FB: Facebook,private order:Order,private toastr:ToastrService) {
		//this.socket = io(environment.urls);
	}

	public ngOnInit() {

		this.socket.on('get-refresh-data', (data) => {
		 
			 
			 
					if(data.user === this.smi.id){
						this.toastr.info('Shared Facebook',  data.name+'  shared with '+ data.friends+ ' friends');
					}
		 
				 
			 
		});
		this.socket.on('users-notification', (data) => {
		 
			 
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

console.log(data);

			this.userOnline = data.s;
			 

			this.informationSocket = data;
			this.like = this.informationSocket.urls;
			if (this.informationSocket.evets === 'si') {

				if (this.smi.name != this.informationSocket.id) { 
					var d = this.like;
					var id = this.informationSocket;
				 	swal({


						title: ' apply for new job?',
						text: "solicitor:" + id.user , 
						imageUrl: id.photo ,
						imageWidth: 150,
						imageHeight: 100, 
						confirmButtonText: 'accept',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33'
					 
					}).then((result) => {
						if (result) {
							this.SharedFacebook(d,id.types,this.informationSocket.idemit);
							 
						}else{
							swal('Cancelled', 'Canceled job ', 'error')
						}
					})
				}
			}
		});
	}


	SharedFacebook(d,id,idemit) {
		this.FB.ui(
			{
				method: 'share',
				href: d,
			}
			).then((res )=>{
				if (res.error_message) {
					swal('Cancelled', 'Canceled job ', 'error')
				} else {

					swal('Successful!', 'Successful work, thank you for your trust', 'success');
					var PostData: any= {
						order_id :id,
						provider_id : 1,
						provider_account_id:this.facebook.id 
					  }
					   
					  this.order.responOrder(PostData); 
					  this.socket.emit('set-refresh-data','refres',this.smi.name,this.facebook.friends_count,idemit,'job'); 
					
				}
			});
					 
		 
	}
	 
}
