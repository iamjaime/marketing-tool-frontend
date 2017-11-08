import { SignupComponent } from './signup.component';
import { TestBed, async } from '@angular/core/testing';
import {  FacebookModule } from 'ngx-facebook';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing'; 
import { UserService } from '../services/user/user.service';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
 
describe('Signup Componen', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({

        providers:[ SignupComponent,UserService, NgbModule, ],
        imports: [HttpModule,  RouterTestingModule,NgbModule.forRoot () ],
        declarations: [ SignupComponent ]
      }).compileComponents();
    }));

    /**
    * should   Create New User
    */
    it('should   Create New User ',  () => {
        const fixture = TestBed.createComponent(SignupComponent);
        const app = fixture.componentInstance;
        expect(app.createUser('jonathan','jonathan@gmail.com','123456')).toBeUndefined();
    });

    /**
    * should   Create New User clone Email
    */
    it('should   Create New User clone Email',  () => {
        const fixture = TestBed.createComponent(SignupComponent);
        const app = fixture.componentInstance;
        expect(app.createUser('jaime','jaime@iamjaime.com','Test123')).toBeUndefined();
    });
    
    /**
    * should    Create New User   Email=null
    */
    it('should   Create New User   Email=null',  () => {
        const fixture = TestBed.createComponent(SignupComponent);
        const app = fixture.componentInstance;
        expect(app.createUser('jonathan','','123456')).toBeUndefined();
    });    
});
