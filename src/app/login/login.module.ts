import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService ,AuthServiceConfig} from "angular4-social-login";
import { SocialLoginModule } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,NgbModule.forRoot ()
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
