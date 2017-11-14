/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { FacebookSocket } from '../../../repositories/facebook/socket';

declare const FB: any;
@Injectable()

export class PostService {

    constructor(private fb: FacebookSocket) { 
    }

    /**
     * Handles  get facebook posts process
     * @param id 
     */
    getPosts(id) {
        FB.api(
            '/' + id,
            'GET',
            {"fields":"sharedposts"},
            function (response) { 
                console.log('posts');
                console.log(response);
            }
        );
    }
}
