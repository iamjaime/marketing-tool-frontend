import { Component,} from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-basic',
  templateUrl: './jobProcess.component.html'
})
export class JobProcess { 
  private socket: io.Socket;
  public dataNotification=[];
  constructor( ) {
		this.socket = io(environment.urls);
	}
  public ngOnInit() {
	this.socket.on('users-notification', (data) => {
    console.log('proceso');
    console.log(data);
      this.dataNotification.push( data);
      
    
  


  });
}
}
