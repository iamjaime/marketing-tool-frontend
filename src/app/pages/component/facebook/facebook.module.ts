import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FacebookComponent } from './facebook.component';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
	path: '',
	data: {
      title: 'Facebook',
      urls: [{title: 'Facebook', url: '/facebook'} ]
    },
	component: FacebookComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
    	RouterModule.forChild(routes)
    ],
	declarations: [FacebookComponent]
})
export class ModalFacebook { }
