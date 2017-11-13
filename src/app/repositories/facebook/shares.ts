/**
 * Created by codehead on 11/9/17.
 */
import { shareInterface } from '../../contracts/facebook/shareInterface';
import { Injectable } from '@angular/core';
import { ShareService } from '../../services/facebook/share';



@Injectable()
export class SharesRepositorio implements shareInterface {

    public constructor(public facebook: ShareService) {

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
