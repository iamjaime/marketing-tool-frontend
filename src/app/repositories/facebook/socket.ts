import { Injectable } from '@angular/core';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';

declare const FB: any;
@Injectable()

export class FacebookSocket {

    constructor(private fb: FacebookService) {
        let initParams: InitParams = { appId: '531968097138866',   status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v2.11' };
        this.fb.init(initParams);
    }
 
}
