import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing'; 
import { Router } from '@angular/router'; 
import {   MockConnection } from '@angular/http/testing';
import { LoginService } from './login.service';


describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [{ provide: Router,  useClass: class { navigate = jasmine.createSpy("navigate"); } },
        LoginService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  }); 

  /**
   * Handles Autentication process
   */
  it('Autentication', (done) => {
    inject([XHRBackend, LoginService], (mockBackend: MockBackend, service: LoginService) => {
      const mockResponse = {
        data: [
          {    "token_type": "Bearer",
          "expires_in": 31536000,
          "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY5OWUwZWU4MzNkYTA0YWMzNmQyYWJmNGI5NDEzNTdlMTlhZWJmN2MyYzc5MTM2YTY5MjAwMDE0Mzg1YWViYzFiZjNmYzlmYjlmMDE5ODIxIn0.eyJhdWQiOiIxIiwianRpIjoiZjk5ZTBlZTgzM2RhMDRhYzM2ZDJhYmY0Yjk0MTM1N2UxOWFlYmY3YzJjNzkxMzZhNjkyMDAwMTQzODVhZWJjMWJmM2ZjOWZiOWYwMTk4MjEiLCJpYXQiOjE1MDk5ODYyNTEsIm5iZiI6MTUwOTk4NjI1MSwiZXhwIjoxNTQxNTIyMjUxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WmfmJrsUYf5Lk37ihnBgqIs74-jdPAwhmafggI9__rGP4-3TTbGw0x6nraYasjh-lovhd1-qqLqYFqXXX5UKYcJKd6sFPtXaqP3xK_bsWZOYXmOG4tgXjDctNzdrWiJEouFu_dG_g59mnLKK8HnEuwWhOex2rtpmx-ZdQWWDsp7dialYU2SlnV7TZOqtmPJYaQyRynN2VO5MXDAUz_C6DD_R-iiRqQMdJohLyCZZXFywKuRGQ1xbgeTIUyLmc2nRNCJJ7udk2BSMvzB3c-PVlBX5Kb4eypLQgtxrdpijYa614F98Tzt1Qb9c4kDHr0V5rs9F2lvawiN7JN75Q-nUzVMykb3xwbFxVBc1L0W4MJIF-8FknevSsIdNh90Tktu7Zl0vY0MWnbAPb3obCxHTZWXdyXeZa8gCi0NVJOTMxuFxBsJ6TEsVGgMAWD7VmSyUZkEqwnOzejbYgNxT_ROLmmHXCl1gsaMl5rMPekryHF1cX7OlG8b28QZ5XEybpqiO3C_-AL2TPtjaqAyokLl9JoP-KTOVKXu9RLB1rpxFdZ-XGEDw0ljutImRMSciCRsc0fGLBWT9CNROAMZsMKYwG8opaclUL1vJS0wKxfEXNghC2Ox2j883oTKk_aMsXMpKV01ZupZlkP4q6grMvqxWIOKSkjpPMHr_eBngsSf6ESs",
          "refresh_token": "def50200dfea2311f1224e57d7822b3546b061cb689f239f5d25270e2d842eb65936ecd8cd931aba09c879d5851805d2bd93e82cfd4d3de781972e7870088ab5b0b94819793e7ff59396870292cc3988c7b4eafe8ffb1107ec90feaad7d72f1c224b05f30994272210185f6f882dff24059de995c4a45cf1da8e9d95b18baefab1a92f532f42ece534947896cb87f9f81c9dfe2ecfffadfe763b63e6b1c43c6a1a5ef96d990e06c37993e09f1bcee5fd5466c78d787f51dbd17a7100136be168ae2c4e8ae470fd6f5c4088b75e6783eb5cdbe90565e18a2e9a4a35ef66df27d3713cb733b17fc827ec993bf20134a4ff37d8e07de8e63e14a596ff96e86290160a88245e64a58e5baf74c9ecbd18cc347126b520c040c3ada3fab162d689a0facbddbd7e71b532f3f2e3b16f3aa56c8af5afffc079bfb139f723f111bf6979ad8c0f1f8b8fbfdafffdafe19c0ee53a9fa5ec1557b37243d674a17d993c731b"}
          
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: mockResponse
        })));
      });
        
        service.Auth('jaime@iamjaime.com','Test123').subscribe(data => {
          var datas = data.json() ;
          console.log(datas);
          expect(datas.data[0].access_token).toBeDefined('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY5OWUwZWU4MzNkYTA0YWMzNmQyYWJmNGI5NDEzNTdlMTlhZWJmN2MyYzc5MTM2YTY5MjAwMDE0Mzg1YWViYzFiZjNmYzlmYjlmMDE5ODIxIn0.eyJhdWQiOiIxIiwianRpIjoiZjk5ZTBlZTgzM2RhMDRhYzM2ZDJhYmY0Yjk0MTM1N2UxOWFlYmY3YzJjNzkxMzZhNjkyMDAwMTQzODVhZWJjMWJmM2ZjOWZiOWYwMTk4MjEiLCJpYXQiOjE1MDk5ODYyNTEsIm5iZiI6MTUwOTk4NjI1MSwiZXhwIjoxNTQxNTIyMjUxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WmfmJrsUYf5Lk37ihnBgqIs74-jdPAwhmafggI9__rGP4-3TTbGw0x6nraYasjh-lovhd1-qqLqYFqXXX5UKYcJKd6sFPtXaqP3xK_bsWZOYXmOG4tgXjDctNzdrWiJEouFu_dG_g59mnLKK8HnEuwWhOex2rtpmx-ZdQWWDsp7dialYU2SlnV7TZOqtmPJYaQyRynN2VO5MXDAUz_C6DD_R-iiRqQMdJohLyCZZXFywKuRGQ1xbgeTIUyLmc2nRNCJJ7udk2BSMvzB3c-PVlBX5Kb4eypLQgtxrdpijYa614F98Tzt1Qb9c4kDHr0V5rs9F2lvawiN7JN75Q-nUzVMykb3xwbFxVBc1L0W4MJIF-8FknevSsIdNh90Tktu7Zl0vY0MWnbAPb3obCxHTZWXdyXeZa8gCi0NVJOTMxuFxBsJ6TEsVGgMAWD7VmSyUZkEqwnOzejbYgNxT_ROLmmHXCl1gsaMl5rMPekryHF1cX7OlG8b28QZ5XEybpqiO3C_-AL2TPtjaqAyokLl9JoP-KTOVKXu9RLB1rpxFdZ-XGEDw0ljutImRMSciCRsc0fGLBWT9CNROAMZsMKYwG8opaclUL1vJS0wKxfEXNghC2Ox2j883oTKk_aMsXMpKV01ZupZlkP4q6grMvqxWIOKSkjpPMHr_eBngsSf6ESs');
          done();
        });
      })();
  });

});