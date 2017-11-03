import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { FacebookModule } from 'ngx-facebook';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config2: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("800498130979-fh62bvfalk7f38coe0q4iucsasf0elk1.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("531968097138866")
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
    SocketIoModule.forRoot(config2),
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig,
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
