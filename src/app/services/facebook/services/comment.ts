/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { FacebookSocket } from '../../../repositories/facebook/socket';

declare const FB: any;
@Injectable()

export class CommentService {

    constructor(private fb: FacebookSocket) { 
    }

    /**
     * Handles  get facebook comments process
     * @param id 
     */
    getComments(id) {
         FB.api(
            '/' + id,
            'GET',
            {"fields":"comments"},
            function (result) { 
                console.log('comments');
                console.log(result);
            }
        );
    }
}
