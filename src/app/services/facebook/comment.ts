/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';

declare const FB: any;
@Injectable()

export class CommentService {

    constructor(private fb: FacebookService) {
        let initParams: InitParams = { appId: '531968097138866', xfbml: true, version: 'v2.10' };
        this.fb.init(initParams);
    }

    /**
     * Handles  get facebook comments process
     * @param id 
     */
    getComments(id) {
        return   FB.api(
            '/' + id,
            'GET',
            {"fields":"comments"},
            function (result) {
                // Insert your code here
                console.log('comments');
                console.log(result);
            }
        );
    }
}
