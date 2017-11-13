/**
 * Created by codehead on 11/9/17.
 */
import { postInterface } from '../../contracts/facebook/postInterface';
import { Injectable } from '@angular/core';
import { PostService } from '../../services/facebook/post'; 

@Injectable()
export class PostsRepositorio implements postInterface {

    public constructor(public facebook: PostService) {

    }

    /**
     *  Handles process to get the Posts
     * @param url 
     * @param quantity 
     */
    public getAllPost(url, quantity) {
        this.facebook.getPosts(url);
        return url;
    } 
}
