/**
 * Created by codehead on 11/9/17.
 */
import { sharesInterface } from '../../contracts/facebook/sharesInterface';
import { Injectable } from '@angular/core';
import { SharesService } from '../../services/facebook/shares';



@Injectable()
export class SharesRepositorio implements sharesInterface {

    public constructor(public facebook: SharesService) {

    }

    /**
     * Handles process to get the shares
     * @param url 
     * @param quantity 
     */
    public getAllShares(url, quantity) {
        this.facebook.getShares(url);
        return url;
    } 
}
