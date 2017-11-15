/**
 * Created by codehead on 11/9/17.
 */
import { Injectable } from '@angular/core';
import { FacebookSocket } from '../../../repositories/facebook/socket';

declare const FB: any;
@Injectable()

export class ShareService {

    constructor(private fb: FacebookSocket) { 
    }

    /**
     * Handles get facebook shares
     * @param id 
     */
    getShares(id) {
        var FBfunction = FB.api(
            '/' + id,
            'GET',
            {"fields":"sharedposts"},
            function (response) { 
                console.log('shares',id);  
                console.log(response);
            }
        );
    }

    
}
