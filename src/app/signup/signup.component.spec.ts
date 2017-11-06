import { SignupComponent } from './signup.component';
import { TestBed, async ,inject} from '@angular/core/testing'; 
import { RouterTestingModule } from '@angular/router/testing';
import { Http,ConnectionBackend ,Headers,RequestOptions,Response} from '@angular/http';
import {environment } from '../../environments/environment';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services/services.service';
import { SignupService } from '../services/signup.service/signup.service';

const headers = new Headers(); 
headers.append('Content-Type', 'application/json; charset=utf-8'); 
headers.append('Access-Control-Allow-Origin', '*');  
let options = new RequestOptions({ headers: headers }); 
 
export function provideConfig() {
  return options;
}

describe('Sign Up', () => {
  
    beforeEach(async(() => {
  
      TestBed.configureTestingModule({
 
        providers:[SignupService,SignupComponent,ServicesService,Http,Response,NgbModule,ConnectionBackend,{  provide: RequestOptions, useFactory: provideConfig  } ],
        imports: [  RouterTestingModule,NgbModule.forRoot () ], 
        declarations: [ SignupComponent ],
       
      }).compileComponents();
    }));

    /**
     * Handles create new user success
     */
    it('create new user success',  () => {
      
      const fixture = TestBed.createComponent(SignupComponent);
      const app = fixture.componentInstance;
      expect(app.createUser('bart','bart@simpson','12345','12345')).toBeDefined();
    });
    it('should be created', inject([SignupComponent], (service: SignupService) => {
      const fixture = TestBed.createComponent(SignupComponent);
      const app = fixture.componentInstance;
      expect(app.createUser('bart','bart@simpson','12345','12345')).toBeDefined();
    }));

    
 
});
