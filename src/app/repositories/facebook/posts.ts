/**
 * Created by codehead on 11/9/17.
 */
import { postsInterface } from '../../contracts/facebook/postInterface';
import { Injectable } from '@angular/core';
import { PostsService } from '../../services/facebook/posts';



@Injectable()
export class PostsRepositorio implements postsInterface {

    public constructor(public facebook: PostsService) {

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
