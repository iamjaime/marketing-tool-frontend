import { Component, OnInit } from '@angular/core';
import { NotificationRepository } from '../../repositories/facebook/notification/notification';  

@Component({
	selector: 'ap-rightsidebar',
	templateUrl: './rightsidebar.component.html'
})

export class RightSidebarComponent {
 
 
	constructor(private notification:NotificationRepository) {
 
	}

	ngOnInit() { 
	this.notification.userOnline();
	}
}
