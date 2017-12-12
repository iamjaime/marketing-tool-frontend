/**
 * Created by codehead on 12/11/17.
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
 
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
     
     
        
    const headers: any= { 
          
            }; 
            if (sessionStorage.getItem('token')) {
              headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
            } else {
     
            }
         

    //Clone the request so that we can append our Auth headers to it.....
    const clone = req.clone({setHeaders : headers });

    //Now lets return the cloned request so that we can continue to the next
    //interceptor/middleware....
    return next.handle(clone);
  }

}
