import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/authInterceptor';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { FacebookModule } from 'ngx-facebook';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


import { FacebookRepository } from './repositories/facebook/facebook';
import { Order } from './repositories/order/order';
import { NotificationRepository } from './repositories/facebook/notification/notification';
import { User } from './repositories/user/user';
import { Login } from './repositories/login/login';

import {  OrderService } from './services/order/order.service';
import {  UserService } from './services/user/user.service';
import {  LoginService } from './services/login/login.service';


import { ToastrModule } from 'ngx-toastr';
import { Helper } from './utils/helpers';
import { environment } from '../environments/environment'



const config2: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("800498130979-fh62bvfalk7f38coe0q4iucsasf0elk1.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookID)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule, BrowserAnimationsModule,   // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
    SocketIoModule.forRoot(config2)
  ],
  providers: [  Order, Login,User,FacebookRepository,NotificationRepository,UserService,LoginService,OrderService, Helper,
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig,
  },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
