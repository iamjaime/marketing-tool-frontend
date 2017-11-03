import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../environments/environment';
import { Http ,Headers,RequestOptions} from '@angular/http';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
 
export class SignupComponent implements OnInit {
    result:any;
    constructor(private http: Http,private router :Router) { }

    ngOnInit() { }

    /**
     * Handles create new user process
     */
    createUser(name,email,password,passwordverification) {
        if(password===passwordverification){ 
            
            let url = environment.baseApiUrl+'/'+environment.baseApiPrefix+'/'+environment.baseApiVersion+'/users';
            let postData = {
              client_id : environment.baseApiClientId ,
              client_secret :environment.baseApiClientSecret,
              grant_type : environment.baseApiGrantType,
              name : name,
              email:email,
              password :password,
              provider : "system",
              provider_id : 1
            };
        
            const headers = new Headers(); 
            headers.append('Content-Type', 'application/json; charset=utf-8'); 
            headers.append('Access-Control-Allow-Origin', '*');  
            let options = new RequestOptions({ headers: headers }); 
             this.http.post( url, { data : postData },options)
            .subscribe(   response    => {
                this.result = response.json();
                console.log(this.result );
                return response;  
            },
            err => {
                this.result =err.json();
                return err ; 
            });
           
             
         
        }
        else{
            return 'false';
        }
     }
}
