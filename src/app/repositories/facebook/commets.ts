/**
 * Created by codehead on 11/9/17.
 */
import { commentInterface } from '../../contracts/facebook/commentInterface';
import { Injectable } from '@angular/core';
import { CommentService } from '../../services/facebook/comment';

@Injectable()
export class CommetsRepositorio implements commentInterface {

    public constructor(public facebook: CommentService) {

    }

    /**
     * Handles process to get the comments
     * @param url 
     * @param quantity 
     */
    public getAllComments(url, quantity) {
        this.facebook.getComments(url);
        return url;
    }



}
