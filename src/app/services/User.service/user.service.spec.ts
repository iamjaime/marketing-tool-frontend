 
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing'; 
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'; 
import {   MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';
let resul:any;
describe('User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [{ provide: Router,  useClass: class { navigate = jasmine.createSpy("navigate"); } },
      UserService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });


  /**
  * Handles create new user process
    */
  it('User Add', (done) => {
    inject([XHRBackend, UserService], (mockBackend: MockBackend, service: UserService) => {
      const mockResponse = {
        data: [
          {
            "success":true,
            "name": "jaime",
            "email": "jaime1@iamjaime.com",
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
          body:  mockResponse
        })));
      });
        
        service.Add('jonathan','jaime@iamjaime.com','Test123','Test123').subscribe(data => {
          resul = data.json();
          console.log(resul.data[0].success);
          expect(resul.data[0].success).toEqual(true);;
          done();
        });
      })();
  });

});