import { SignupComponent } from './signup.component';
import { TestBed, async } from '@angular/core/testing'; 
import { RouterTestingModule } from '@angular/router/testing';
 
describe('Login', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({

        providers:[  ],
        imports: [  RouterTestingModule ],
        declarations: [ SignupComponent ]
      }).compileComponents();
    }));

    /**
     * Handles create new user success
     */
    it('create new user success',  () => {
      const fixture = TestBed.createComponent(SignupComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.createUser('a','b','c','c')).toBe('true');
    });
   
    /**
     * Handles create new user fail
     */
    it('create new user fail',  () => {
      const fixture = TestBed.createComponent(SignupComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.createUser('a','b','c','d')).toBe('false');
    });
});
