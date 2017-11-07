
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { UserService } from './user.service';

let result : any;

describe('User', () => {
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
  * Handles create new user process
    */
  it('Should Create A New User', (done) => {
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
          status: 200,
          body:  mockResponse
        })));
      });

        service.create('jonathan','jaime@iamjaime.com','Test123').subscribe(data => {
          result = data.json();

          expect(result.data.length).toBeGreaterThan(0);
          expect(result.data[0].success).toEqual(true);

          done();
        });
      })();
  });

});
