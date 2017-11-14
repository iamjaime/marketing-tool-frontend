import { FacebookComponent } from './facebook.component';
import { TestBed, async } from '@angular/core/testing';
import {  FacebookModule } from 'ngx-facebook';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import {    AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider     } from "angular4-social-login";
 
import { FacebookSocket } from '../../../repositories/facebook/socket';
import { FacebookRepository} from '../../../repositories/facebook/facebook';
import { LikeRepository} from '../../../repositories//facebook/services/like';
import { CommentRepository} from '../../../repositories//facebook/services/comment';
import { PostRepository} from '../../../repositories//facebook/services/post';
import { ShareRepository} from '../../../repositories//facebook/services/share';

import {LikeService} from '../../../services/facebook/services/like';
import {CommentService} from '../../../services/facebook/services/comment';
import {PostService} from '../../../services/facebook/services/post';
import {ShareService} from '../../../services/facebook/services/share';



describe('Facebook ', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({

        providers:[ShareService,PostService,PostRepository,ShareRepository,CommentService,CommentRepository,FacebookSocket,LikeService,LikeRepository, FacebookRepository, NgbModule ],
        imports: [ RouterTestingModule,NgbModule.forRoot (),FacebookModule.forRoot()],
        declarations: [ FacebookComponent ]
      }).compileComponents();
    }));

 
    /**
    * should login with Facebook
    */
    it('likes',  () => {
      const fixture = TestBed.createComponent(FacebookComponent);
      const app = fixture.componentInstance;
      expect(app.likeService('https://www.facebook.com/Roboticaesimez/videos/1566496720059978/','')).toBeUndefined();
    });

});
