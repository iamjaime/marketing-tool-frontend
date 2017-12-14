import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { environment } from '../../../../../environments/environment';
import swal from 'sweetalert2';
import { FacebookRepository as Facebook } from '../../../../repositories/facebook/facebook';
import { OrderService } from '../../../../services/order/order.service';
import { Order } from '../../../../repositories/order/order'; 
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'ap-rightsidebar3',
	templateUrl: './tabfacebook.component.html'
})

export class tabfacebookComponent {

	smi = (!sessionStorage.getItem('smi')) ? {} : JSON.parse(sessionStorage.getItem('smi'));
	facebook = (!sessionStorage.getItem('facebook')) ? {} : JSON.parse(sessionStorage.getItem('facebook'));
	result: any;
	type: any = [];
	buys: any = [];
	constructor(private order: Order, private orderservice: OrderService, private FB: Facebook, private toastr: ToastrService, private socket: Socket) {
		//this.socket = io(environment.urls);
	}

	ngOnInit() {

		this.orderservice.getOrderInfoAll().then((result) => {
			var resul = JSON.stringify(result);
			var res = JSON.parse(resul);
			this.type = res.data;
			this.buys = res.data[0].orders;


		});

		this.socket.on('get-refresh-data', (data) => { 
			console.log('actualizar');
			console.log(data.data);
			if (data.data === 'refresh') {
				this.orderservice.getOrderInfoAll().then((result) => {
					var resul = JSON.stringify(result);
					var res = JSON.parse(resul);
					this.type = res.data;
					this.buys = res.data[0].orders;
				});

			}
		});

	}


	/**
	 * Handles  post on Facebook
	 * @param url 
	 * @param id 
	 */
	actionFacebook(url, id, user) {

		this.FB.ui({ method: 'share', href: url }).then((response) => {

			if (response.error_message) {
				swal('Cancelled', 'Canceled job ', 'error');
			} else {
				swal('Successful!', 'Successful work, thank you for your trust', 'success');
				var PostData: any = {
					order_id: id,
					provider_id: 1,
					provider_account_id: this.facebook.id
				}

				this.order.responOrder(PostData).then((response) => { 
					var dataSocket: any = {
						refresh: 'refresh',
						name: this.smi.name,
						friends: this.facebook.friends_count,
						user: user,
						type: 'job'
					};
					this.orderservice.refreshDataSocket(dataSocket); 
					this.toastr.success('Successful', ' Orders');
				},
					(err) => {
						console.log(err);
						this.toastr.error('Error', '  Orders ');
					});
			}
		});

		var provider = this.getProvider(this.smi.attached_networks, 'Facebook');


	}

	/**
	 * Handles getting a specific provider from array of networks.
	 *
	 * @param array  networks  The array of attached_networks
	 * @param string  provider  The provider name
	 * @returns {any}
	 */
	private getProvider(networks, provider) {
		for (let i = 0; i < networks.length; i++) {
			if (networks[i].provider.name == provider) {
				return networks[i];
			}
		}
		return false;
	}

	/**
	  * Handles the process to buy shares package
	  * @param url
	  * @param quantity
	  */
	verifyUrl(url) {
		if (url) {
			swal({
				html: '<iframe src="https://www.facebook.com/plugins/post.php?href=' +
				url + '&width=500&show_text=false& = &height=497' +
				'"  width="100%"height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>',

				confirmButtonText: 'ok',

				showLoaderOnConfirm: true,
			})
		}
	}

}
