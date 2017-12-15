/**
 * Created by codehead on 12/11/17.
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
 


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
 
  intercept (req: HttpRequest<any>, next: HttpHandler):any  {

    const headers: any = {};

    //If user is authenticated, we will need to pass in the auth token into the headers.
    if (sessionStorage.getItem('token')) {
      let token = sessionStorage.getItem('token');
      headers.Authorization = 'Bearer ' + token;
    }

    //Clone the request so that we can append our Auth headers to it.....
    const clone = req.clone({setHeaders : headers });

    //Now lets return the cloned request so that we can continue to the next
    //interceptor/middleware....
    return next.handle(clone);
  }

}
