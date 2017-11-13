/**
 * Created by codehead on 11/9/17.
 */
import { commentsInterface } from '../../contracts/facebook/commentsInterface';
import { Injectable } from '@angular/core';
import { CommentsService } from '../../services/facebook/comments';

@Injectable()
export class CommetsRepositorio implements commentsInterface {

    public constructor(public facebook: CommentsService) {

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
