import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders ,HttpErrorResponse, HttpRequest,HttpEvent, HttpEventType} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';

interface LoginResponse {
  accessToken: string;
  accessExpiration: number;
}

@Injectable()
export class LoginService {
 
 
  url = environment.baseApiUrl;
  result: any;
  response: any;

  constructor(private HttpClient: HttpClient, private router: Router,private socket: Socket) {

  }

  /**
   * Handles authentication service
   * @param username
   * @param password
   */
  Auth(data){
   
    let postData =  {
      client_id: environment.baseApiClientId,
      client_secret: environment.baseApiClientSecret,
      grant_type: environment.baseApiGrantType,
      username: data.email,
      password: data.password
    }; 
 
    return  this.HttpClient.post(this.url + '/oauth/token',  postData   ).map((res) => res).toPromise();
  }

  /**
   * Handles connecting the user to the socket io main socket
   * @param sessionData
   */
  connectToSocket(sessionData) {
    this.socket.emit('set-connection', sessionData.name, sessionData.avatar);
    this.socket.emit('set-nickname',   sessionData.name, sessionData.avatar);
    this.socket.on('get-connection', (data) => {
      console.log('user online'); 
      console.log(data); 
    
    })
  }

  
 
}
