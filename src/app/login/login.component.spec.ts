import { LoginComponent } from './login.component';
import { TestBed, async } from '@angular/core/testing';
import {  FacebookModule } from 'ngx-facebook';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import {    AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider , AuthService    } from "angular4-social-login";
import { LoginService } from '../services/login/login.service';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Login} from '../repositories/login/login';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,  provider: new GoogleLoginProvider("800498130979-fh62bvfalk7f38coe0q4iucsasf0elk1.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider("531968097138866")
  }
]);

export function provideConfig() {
  return config;
}

describe('Login Component', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({

        providers:[Login, LoginService , NgbModule,AuthService,{  provide: AuthServiceConfig, useFactory: provideConfig } ],
        imports: [HttpModule,  RouterTestingModule,NgbModule.forRoot (),FacebookModule.forRoot()],
        declarations: [ LoginComponent ]
      }).compileComponents();
    }));

    /**
    * should login with Email and Password
    */
    it('should login with Email and Password',  () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.login('jaime@iamjaime.com','Test123')).toBeUndefined();
      });

    /**
    * should login with Email=null and Password
    */
    it('should login with Email=null and Password',  () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.login( '','Test123')).toBeUndefined();
      });

    /**
    * should login with Email=null and Password=null
    */
    it('should login with Email=null and Password=null',  () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.login( '','')).toBeUndefined();
      });
    /**
    * should enter with Google
    */
    it('should login with Google',  () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      expect(app.loginGoogle).toBeDefined();
    });

    /**
    * should login with Facebook
    */
    it('should login with Facebook',  () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      expect(app.loginFacebook).toBeDefined();
    });

});
