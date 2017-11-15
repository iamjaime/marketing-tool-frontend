import { FacebookComponent } from './facebook.component';
import { TestBed, async } from '@angular/core/testing';
import { FacebookModule } from 'ngx-facebook';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 

import { FacebookSocket } from '../../../repositories/facebook/socket';
import { FacebookRepository } from '../../../repositories/facebook/facebook';

import { LikeRepository } from '../../../repositories//facebook/services/like';
import { CommentRepository } from '../../../repositories//facebook/services/comment';
import { PostRepository } from '../../../repositories//facebook/services/post';
import { ShareRepository } from '../../../repositories//facebook/services/share';

import { LikeService } from '../../../services/facebook/services/like';
import { CommentService } from '../../../services/facebook/services/comment';
import { PostService } from '../../../services/facebook/services/post';
import { ShareService } from '../../../services/facebook/services/share';



describe('Facebook Services', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({

            providers: [ShareService, PostService, PostRepository, ShareRepository, CommentService, CommentRepository, FacebookSocket, LikeService, LikeRepository, FacebookRepository, NgbModule],
            imports: [  NgbModule.forRoot(), FacebookModule.forRoot()],
            declarations: [FacebookComponent]
        }).compileComponents();
    }));


    /**
    * should login with Facebook
    */
    it('should  get  likes ', () => {
        const fixture = TestBed.createComponent(FacebookComponent);
        const app = fixture.componentInstance;
        expect(app.likeService('https://www.facebook.com/Roboticaesimez/videos/1566496720059978/', '')).toBeUndefined();

        expect(app.likeService('https://www.facebook.com/WixEspanol/photos/p.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.likeService('https://www.facebook.com/WixEspanol/photos/a.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.likeService(' https://www.facebook.com/photo.php?fbid=10155178740307914&set=gm.1974534432805370&type=3&theater', '')).toBeUndefined();

        expect(app.likeService('https://www.facebook.com/groups/ChistesProgramadores/permalink/737882663002258/?comment_id=738485716275286&comment_tracking=%7B%22tn%22%3A%22R0%22%7D', '')).toBeUndefined();
    });

    it('should  get comments', () => {
        const fixture = TestBed.createComponent(FacebookComponent);
        const app = fixture.componentInstance;
        expect(app.commentsService('https://www.facebook.com/Roboticaesimez/videos/1566496720059978/', '')).toBeUndefined();

        expect(app.commentsService('https://www.facebook.com/WixEspanol/photos/p.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.commentsService('https://www.facebook.com/WixEspanol/photos/a.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.commentsService(' https://www.facebook.com/photo.php?fbid=10155178740307914&set=gm.1974534432805370&type=3&theater', '')).toBeUndefined();

        expect(app.commentsService('https://www.facebook.com/groups/ChistesProgramadores/permalink/737882663002258/?comment_id=738485716275286&comment_tracking=%7B%22tn%22%3A%22R0%22%7D', '')).toBeUndefined();
    });

   

    it('should  get posts', () => {
        const fixture = TestBed.createComponent(FacebookComponent);
        const app = fixture.componentInstance;
        expect(app.postsService('https://www.facebook.com/Roboticaesimez/videos/1566496720059978/', '')).toBeUndefined();

        expect(app.postsService('https://www.facebook.com/WixEspanol/photos/p.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.postsService('https://www.facebook.com/WixEspanol/photos/a.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.postsService(' https://www.facebook.com/photo.php?fbid=10155178740307914&set=gm.1974534432805370&type=3&theater', '')).toBeUndefined();

        expect(app.postsService('https://www.facebook.com/groups/ChistesProgramadores/permalink/737882663002258/?comment_id=738485716275286&comment_tracking=%7B%22tn%22%3A%22R0%22%7D', '')).toBeUndefined();
    });

    it('should  get shares', () => {
        const fixture = TestBed.createComponent(FacebookComponent);
        const app = fixture.componentInstance;
        expect(app.sharesService('https://www.facebook.com/Roboticaesimez/videos/1566496720059978/', '')).toBeUndefined();

        expect(app.sharesService('https://www.facebook.com/WixEspanol/photos/p.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.sharesService('https://www.facebook.com/WixEspanol/photos/a.10155019291053951/10155019291053951/?type=3&theater', '')).toBeUndefined();

        expect(app.sharesService(' https://www.facebook.com/photo.php?fbid=10155178740307914&set=gm.1974534432805370&type=3&theater', '')).toBeUndefined();

        expect(app.sharesService('https://www.facebook.com/groups/ChistesProgramadores/permalink/737882663002258/?comment_id=738485716275286&comment_tracking=%7B%22tn%22%3A%22R0%22%7D', '')).toBeUndefined();
    });
});



