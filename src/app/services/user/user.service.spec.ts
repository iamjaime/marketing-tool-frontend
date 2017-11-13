
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { UserService } from './user.service';

let result : any;

describe('User Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [{ provide: Router,  useClass: class { navigate = jasmine.createSpy("navigate"); } },
      UserService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });


  /**
  * should create new user process
  */
  it('Should Create A New User', (done) => {
    inject([XHRBackend, UserService], (mockBackend: MockBackend, service: UserService) => {
      const mockResponse = {
        data: [
          {
            "success":true,
            "name": "jaime",
            "email": "jaime1@iamjaime1.com",
            "provider": "system",
            "provider_id": 1,
            "updated_at": "2017-11-06 19:51:10",
            "created_at": "2017-11-06 19:51:10",
            "id": 17
          }
        ]
      };

      mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body:  mockResponse
        })));
      });

        service.create('jonathan','jnathan@gmail.com','1234567890').subscribe(data => {
          result = data.json();

      
          expect(result.data[0].success).toEqual(true);

          done();
        });
      })();
  });
  /**
  * should create new user  Email=null process
  */
  it('Should Create A New User Email=null Error', (done) => {
    inject([XHRBackend, UserService], (mockBackend: MockBackend, service: UserService) => {
      const mockResponse = {
        data: [
          {
            "success":false,
            "email": [
              "The email field is required."
          ]
          }
        ]
      };

      mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
          status: 400,
          body:  mockResponse
        })));
      });

        service.create('jonathan','','1234567890' ).subscribe(data => {
          result = data.json(); 
          console.log(result);
          expect(result.data[0].success).toEqual(false);

          done();
        });
      })();
  });

  

});
